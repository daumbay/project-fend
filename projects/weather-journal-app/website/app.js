/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const apiEndPoint = 'https://api.openweathermap.org/geo/1.0/zip?zip=';
const apiKey = '&appid=aac1d7f7625ee92bc0a51d78900a24a7';

async function getLatLong (url = '') {
    const response = await fetch(url);

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('error', error);
    }
}

document.getElementById('generate').addEventListener('click', () => {
    const zipCode = document.getElementById('zip').value;
    const response = getLatLong(apiEndPoint + zipCode + apiKey);
    response.then((data) => {
        console.log(data);
    });
});