const APIKEY = 'b1553b0af8e2d8c92d386aad1f9b2a26';
const URLBase = "https://api.openweathermap.org/data/2.5/weather?";

async function request(url){
    return fetch(url).then(data => data.json());
}

async function getWeather(lat, lon){
    url = `${ URLBase }lat=${ lat }&lon=${ lon }&appid=${APIKEY}`;
    const weather = await request(url);
    console.log(weather);
    updateDoM(weather.name,weather.main.temp);
}

async function getWeatherByCity(city){
    const url =URLBase + `q=${city}&appid=${APIKEY}`;
    const weather = await request(url);
    updateDoM(weather.name, weather.main.temp);
}

function updateDoM(city, temp) {
    document.getElementById('city').textContent = `Clima en ${city}`;
    const temperatureCelsius = Math.round(temp - 273.15);
    document.getElementById('temperature').textContent = `${temperatureCelsius}°C`;
    updateBackground(temperatureCelsius);
}

function updateBackground(temperature) {
    // Obtener el elemento body
    const body = document.body;

    // Actualizar el fondo dependiendo de la temperatura
    if (temperature > 30) {
        body.style.backgroundImage = 'url("./sol.png")';
    } else if (temperature > 20) {
        body.style.backgroundImage = 'url("./sol-nube.png")';
    } else if (temperature > 10) {
        body.style.backgroundImage = 'url("./luna-estrellas.png")';
    } else {
        body.style.backgroundImage = 'url("./luna.jpg")';
    }
    body.style.backgroundSize = 'cover';
    body.style.backgroundRepeat = 'no-repeat';
}

document.getElementById('weatherForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const cityInput = document.getElementById('cityInput').value;
    const countrySelect = document.getElementById('country');
    const selectedCountry = countrySelect.options[countrySelect.selectedIndex].value;

    if (cityInput && selectedCountry) {
        getWeatherByCity(cityInput, selectedCountry);
    } else {
        alert('Por favor, completa la ciudad y selecciona el país antes de buscar.');
    }
});



navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeather(lat, lon);
});
