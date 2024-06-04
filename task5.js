const apiKey = 'bf69f37456f468f66c73b8f8daa6658f'; // Replace with your OpenWeatherMap API key
const weatherInfo = document.getElementById('weatherInfo');
const searchButton = document.getElementById('searchButton');
const locationInput = document.getElementById('locationInput');

searchButton.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        fetchWeatherData(location);
    } else {
        alert('Please enter a location');
    }
});

function fetchWeatherData(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    
    console.log(`Fetching weather data for: ${location}`);
    console.log(`Request URL: ${url}`);
    
    fetch(url)
        .then(response => {
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error('Location not found');
            }
            return response.json();
        })
        .then(data => {
            console.log('Weather data:', data);
            displayWeatherData(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = '<p>Unable to retrieve weather data. Please try again later.</p>';
        });
}

function displayWeatherData(data) {
    const { name, main, weather, wind } = data;
    const weatherDescription = weather[0].description;
    const weatherEmoji = getWeatherEmoji(weatherDescription);
    const temperature = main.temp;

    weatherInfo.innerHTML = `
        <h2>${name}</h2>
        <p>${weatherEmoji} ${weatherDescription}</p>
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
    `;

    // Change background based on weather condition
    changeBackground(weatherDescription);
}

function getWeatherEmoji(description) {
    const lowerCaseDescription = description.toLowerCase();
    if (lowerCaseDescription.includes('clear')) {
        return '☀️'; // Sun emoji
    } else if (lowerCaseDescription.includes('clouds')) {
        return '☁️'; // Cloud emoji
    } else if (lowerCaseDescription.includes('rain')) {
        return '🌧️'; // Rain emoji
    } else if (lowerCaseDescription.includes('snow')) {
        return '❄️'; // Snow emoji
    } else if (lowerCaseDescription.includes('thunderstorm')) {
        return '⛈️'; // Thunderstorm emoji
    } else if (lowerCaseDescription.includes('mist')) {
        return '🌫️'; // Mist emoji
    } else {
        return '🌈'; // Default emoji
    }
}

function changeBackground(description) {
    const lowerCaseDescription = description.toLowerCase();
    if (lowerCaseDescription.includes('clear')) {
        document.body.style.backgroundImage = "url()"; // Path to clear sky image
    } else if (lowerCaseDescription.includes('clouds')) {
        document.body.style.backgroundImage = "url('')"; // Path to cloudy image
    } else if (lowerCaseDescription.includes('rain')) {
        document.body.style.backgroundImage = "url('')"; // Path to rainy image
    } else if (lowerCaseDescription.includes('snow')) {
        document.body.style.backgroundImage = "url('')"; // Path to snowy image
    } else if (lowerCaseDescription.includes('thunderstorm')) {
        document.body.style.backgroundImage = "url('')"; // Path to thunderstorm image
    } else if (lowerCaseDescription.includes('mist')) {
        document.body.style.backgroundImage = "url('')"; // Path to mist animation
    } else {
        document.body.style.backgroundImage = "url('default.jpg')"; // Path to default image
    }
}
