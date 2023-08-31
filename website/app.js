import API from "./api";
/* Global Variables */

const API_KEY_OPEN_WEATHERMAP = '0a6f3c93694897d03df8bd5af22ad641';

const zipInput = /** @type {HTMLInputElement} */ (document.getElementById('zip'));
const feelingsInput = /** @type {HTMLTextAreaElement} */ (document.getElementById('feelings'));
const btnGenerate = /** @type {HTMLButtonElement} */ (document.getElementById('generate'));
const loadingMessageContainer = /** @type {HTMLDivElement} */ (document.getElementById('loadingMessageCtn'));

let zip = '';
let feelings = '';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/**
 * Creates a debounced version of a function that will delay its execution until after a specified amount of time has passed since the last call.
 * 
 * @param {Function} fn - The function to debounce.
 * @param {number} wait - The number of milliseconds to wait before executing the debounced function.
 * @returns {Function} The debounced function.
 */
function debounce(fn, wait) {
    let timeout;

    // Return the debounced function
    return function (...args) {
        // Clear the previous timeout if the debounced function is called again
        clearTimeout(timeout);

        // Set a new timeout to execute the function after the specified wait time
        timeout = setTimeout(() => fn.apply(this, args), wait);
    };
}


function setLoading(loading) {
    if(loading) {
        loadingMessageContainer.classList.add('show');
        return;
    }

    loadingMessageContainer.classList.remove('show');
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

        const resultWeather = await API.weather.data();
        const resultFeedback = await API.userFeedback.add();
        
    }catch(error){
        console.log(error);
        alert('An error occured');
    }finally {
        activeBtnGenerate();
        setLoading(false);
    }
}

const debounceZipInput = debounce(handleZipInput, 300);
const debounceFeelingsInput = debounce(handleFeelingsInput);

zipInput.addEventListener('change', debounceZipInput);
feelingsInput.addEventListener('change', debounceFeelingsInput);
btnGenerate.addEventListener('click', handleBtnGenerateClick);

