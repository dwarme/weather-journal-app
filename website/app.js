/* Global Variables */

const API_KEY_OPEN_WEATHERMAP = '0a6f3c93694897d03df8bd5af22ad641';

const zipInput = document.getElementById('zip');
const feelingsInput = document.getElementById('feelings');
const btnGenerate = document.getElementById('generate');

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

async function fetchWeatherData() {

}

function handleZipInput() {
    
}

function handleFeelingsInput() {

}

function handleBtnGenerateClick() {

}

const debounceZipInput = debounce(handleZipInput, 300);
const debounceFeelingsInput = debounce(handleFeelingsInput);

zipInput.addEventListener('change', debounceZipInput);
feelingsInput.addEventListener('change', debounceFeelingsInput);

