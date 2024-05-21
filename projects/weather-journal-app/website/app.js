/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const apiEndPoint = 'https://api.openweathermap.org/geo/1.0/zip?zip='
const zipCode = document.getElementById('zip').value;
const apiKey = '&appid=aac1d7f7625ee92bc0a51d78900a24a7';

async function getLatLong (url = '', data = {}) {
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('error', error);
    }
}

document.getElementById('generate').addEventListener('click', () => {
    const response = getLatLong(apiEndPoint + zipCode + apiKey, {});
});