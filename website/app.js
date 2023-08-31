import API from "./api.js";
/* Global Variables */

// Personal API Key for OpenWeatherMap API
const COUNTRY_OPENWEARTHER = 'US'
const API_KEY_OPENWEATHER = `0a6f3c93694897d03df8bd5af22ad641&units=imperial`;
const API_URL_OPENWEATHER = 'https://api.openweathermap.org/data/2.5/weather';

const zipInput = /** @type {HTMLInputElement} */ (document.getElementById('zip'));
const feelingsInput = /** @type {HTMLTextAreaElement} */ (document.getElementById('feelings'));
const btnGenerate = /** @type {HTMLButtonElement} */ (document.getElementById('generate'));

let zip = '';
let feelings = '';

// Create a new date instance dynamically with JS
function getCurrentDate() {
    let d = new Date();
    let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
    return newDate;
}

/**
 * Creates a debounced version of a function that will delay its execution until after a specified amount of time has passed since the last call.
 * 
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to wait before executing the debounced function.
 * @returns {Function} The debounced function.
 */
function debounce(func, wait) {
    let timeout;

    // Return the debounced function
    return function (...args) {
        // Clear the previous timeout if the debounced function is called again
        clearTimeout(timeout);

        // Set a new timeout to execute the function after the specified wait time
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

async function showLastFeedback() {
    try {
        const feedbacks = await API.userFeedback.all();
        const feedbacksKey = Object.keys(feedbacks);
        if(feedbacksKey.length === 0) return;

        const lastFeedbackKey = feedbacksKey[ feedbacksKey.length - 1 ];
        const lastFeedback = feedbacks[lastFeedbackKey];

        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = Math.round(lastFeedback.temp)+ ' degrees';
        document.getElementById('content').innerHTML = lastFeedback.feelings;
        document.getElementById('date').innerHTML =lastFeedback.date;

    }catch(error){
        console.warn(error)
    }
}

function cleanInputs() {
    disableBtnGenerate();

    zipInput.value = '';
    zip = '';

    feelingsInput.value = '';
    feelings = '';
}

function setLoading(loading) {
    if(loading) {
        btnGenerate.innerHTML = 'Loading ...';
        return;
    }

    btnGenerate.innerHTML = 'Generate';
}

function disableBtnGenerate() {
    btnGenerate.disabled = true;
}

function activeBtnGenerate() {
    btnGenerate.disabled = false;
}

function checkValidity() {
    if(Boolean(zip) && Boolean(feelings)) {
        activeBtnGenerate();
        return;
    }

    disableBtnGenerate();
}

function handleZipInput() {
    zip = zipInput.value.trim();
    checkValidity();
}

function handleFeelingsInput() {
    feelings = feelingsInput.value.trim();
    checkValidity();
}

async function handleBtnGenerateClick() {
    disableBtnGenerate();
    setLoading(true);

    try {

        const API_QUERY_OPENWEARTH = `?zip=${zip},${COUNTRY_OPENWEARTHER}&appid=${API_KEY_OPENWEATHER}`
        const resultWeather = await API.weather.data(API_URL_OPENWEATHER + API_QUERY_OPENWEARTH);

        const {temp} = resultWeather.main;
        const date = getCurrentDate();

        await API.userFeedback.add({date, temp, feelings});

        cleanInputs();
        showLastFeedback();

    }catch(error){
        console.warn(error);
        alert('An error occured');

    }finally {
        activeBtnGenerate();
        setLoading(false);
    }
}

const debounceZipInput = debounce(handleZipInput, 300);
const debounceFeelingsInput = debounce(handleFeelingsInput, 300);

zipInput.addEventListener('change', debounceZipInput);
feelingsInput.addEventListener('change', debounceFeelingsInput);
btnGenerate.addEventListener('click', handleBtnGenerateClick);

showLastFeedback();

