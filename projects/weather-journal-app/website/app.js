/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
const baseLatLon = 'https://api.openweathermap.org/geo/1.0/zip?zip=';
const apiKey = '&appid=aac1d7f7625ee92bc0a51d78900a24a7';

// Retreive data from third party url
async function getData (url = '') {
    const response = await fetch(url);

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('error', error);
    }
}

// Post data to server given in data object
async function postData (url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
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

// Populate relevant UI with data from server
async function updateUI () {
    const response = await fetch('all');

    try {
        const newData = await response.json();
        document.getElementById('temp').innerText = newData[newData.length-1].temperature;
        document.getElementById('date').innerText = newData[newData.length-1].date;
        document.getElementById('content').innerText = newData[newData.length-1].value;
    } catch (error) {
        console.log('error', error);
    }
}

// Recover weather data from latlon data
function latlon (location) {
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}${apiKey}`;
    return getData(urlWeather);
}

// Recover temperature data from weather data
function weatherData (weather) {
    const temperature = weather.main.temp;
    return temperature;
}

document.getElementById('generate').addEventListener('click', () => {
    // Get zipcode from input element
    const zipCode = document.getElementById('zip').value;
    
    // Get latlon data from zip code
    const response = getData(baseLatLon + zipCode + apiKey);
    response
    // Get weather data from latlon data
    .then(latlon)
    // Get temperature data from weather data
    .then(weatherData)
    // Post weather data and mood details to site
    .then((data) => {
        postData('/weather', {'temperature': data, 'date': newDate, 'value': document.getElementById('feelings').value})
    })
    // Update UI by combining weather data and mood details from site
    .then(() => updateUI())
});
    
