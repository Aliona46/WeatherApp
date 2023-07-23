const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const windSpeedElement = document.getElementById('wind-speed');
const weatherDescriptionElement = document.getElementById('weather-description');
const weatherIconElement = document.getElementById('weather-icon');


fetch('https://get.geojs.io/v1/ip/geo.json')
  .then(response => response.json())
  .then(data => {
    const latitude = data.latitude;
    const longitude = data.longitude;
    const city = data.city;

    
    locationElement.textContent = `Weather in ${city}`;

    
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    return fetch(weatherUrl);
  })
  .then(response => response.json())
  .then(weatherData => {
    const temperature = weatherData.current_weather.temperature;
    const windSpeed = weatherData.current_weather.windspeed;
    const weatherCode = weatherData.current_weather.weathercode;

    
    temperatureElement.textContent = `Temperature: ${temperature}°C`;
    windSpeedElement.textContent = `Wind speed: ${windSpeed} m/s`;

   
    const weatherDescriptionText = getWeatherDescription(weatherCode);
    const weatherIconPath = getWeatherIcon(weatherCode);

    
    weatherDescriptionElement.textContent = weatherDescriptionText;
    weatherIconElement.src = weatherIconPath;
    weatherIconElement.alt = weatherDescriptionText;
  })
  .catch(error => {
    console.error('Error:', error);
    locationElement.textContent = 'Could not get information about weather';
  });


function getWeatherDescription(weatherCode) {
  const weatherDescriptions = {
    '0': 'Clear sky',
    '1': 'Mainly clear',
    '2': 'Partly cloudy',
    '3': 'Overcast',
    '45': 'Fog',
    '48': 'Depositing rime fog',
    '51': 'Light drizzle',
    '53': 'Moderate drizzle',
    '55': 'Drizzle: dense',
    '56': 'Freezing drizzle: light',
    '57': 'Freezing drizzle: dense',
    '61': 'Rain: slight',
    '63': 'Rain: moderate',
    '65': 'Rain: heavy',
    '66': 'Freezing rain: light',
    '67': 'Freezing rain: heavy',
    '71': 'Snow fall: slight',
    '73': 'Snow fall: moderate',
    '75': 'Snow fall: heavy',
    '77': 'Snow grains',
    '80': 'Rain showers: slight',
    '81': 'Rain showers: moderate',
    '82': 'Rain showers: violent',
    '85': 'Snow showers: slight',
    '86': 'Snow showers: heavy',
    '95': 'Thunderstorm',
    '96': 'Thunderstorm with slight hail',
    '99': 'Thunderstorm with heavy hail',
  };

  return weatherDescriptions[weatherCode] || 'Unknown';
}


function getWeatherIcon(weatherCode) {
  const weatherIcons = {
    '0': 'images/clear-sky.png',
    '1': 'images/weather.png',
    '2': 'images/cloud.png',
    '3': 'images/clouds.png',
    '45': 'images/weather_cloud_fog_icon_134165.png',
    '51': 'images/rainy.png',
    '53': 'images/rainy.png',
    '55': 'images/rainy.png',
    '56': 'images/freezing-rain.png',
    '57': 'images/freezing-rain.png',
    '61': 'images/rain.png',
    '63': 'images/rain.png',
    '65': 'images/rain.png',
    '66': 'images/freezing-rain.png',
    '67': 'images/freezing-rain.png',
    '71': 'images/snowfall.png',
    '73': 'images/snowfall.png',
    '75': 'images/snowfall.png',
    '77': 'images/snowing.png',
    '80': 'images/rain.png',
    '81': 'images/rain.png',
    '82': 'images/rain.png',
    '85': 'images/snowy.png',
    '86': 'images/snowy.png',
    '95': 'images/thunder-weather-forecast-icon-vector-47397368.webp',
    '96': 'images/thunder-weather-forecast-icon-vector-47397368.webp',
    '99': 'images/thunder-weather-forecast-icon-vector-47397368.webp',
  };

  return weatherIcons[weatherCode] || 'images/unknown-weather-256.png';
}