/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const baseLatLon = 'https://api.openweathermap.org/geo/1.0/zip?zip=';
const apiKey = '&appid=aac1d7f7625ee92bc0a51d78900a24a7';

async function getData (url = '') {
    const response = await fetch(url);

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('error', error);
    }
}

async function postData (url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST'
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('error', error);
    }
}

function latlon (location) {
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}${apiKey}`;
    return getData(urlWeather);
}

function weatherData (weather) {
    console.log(weather);
}

document.getElementById('generate').addEventListener('click', () => {
    const zipCode = document.getElementById('zip').value;
    const response = getData(baseLatLon + zipCode + apiKey);
    response.then(latlon).then(weatherData);
});
    
