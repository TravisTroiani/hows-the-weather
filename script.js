
const form = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const currentWeatherDiv = document.getElementById('current-weather');
const forecastDiv = document.getElementById('forecast');
const searchHistoryDiv = document.getElementById('search-history');

async function fetchWeather(cityName) {
    const apiKey = "d84a44f96fff68524d2248d02c76f4d8";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
}
form.addEventListener('submit', async function(event) {
    event.preventDefault();
    const cityName = cityInput.value.trim();
    if (cityName === '') {
        alert('Please enter a city name.');
        return;
    }
    
    try {
        const apiKey = "d84a44f96fff68524d2248d02c76f4d8";
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
        
        const currentWeatherResponse = await fetch(currentWeatherUrl);
        const forecastResponse = await fetch(forecastUrl);
        
        if (!currentWeatherResponse.ok || !forecastResponse.ok) {
            throw new Error('Weather data not available.');
        }
        
        const currentWeatherData = await currentWeatherResponse.json();
        const forecastData = await forecastResponse.json();
        displayWeather(currentWeatherData);
        displayForecast(forecastData);
    } catch (error) {
        console.error(error);
        alert('Error fetching weather data.');
    }
});

function displayWeather(data) {
    const cityName = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    const weatherHTML = `
        <h2>${cityName}</h2>
        <p>Temperature: ${temperature} K</p>
        <p>Description: ${description}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
    `;
    currentWeatherDiv.innerHTML = weatherHTML;
}

// function displayForecast(data) {
//     forecastDiv.innerHTML = ""; // Clear previous content

//     const forecastItems = data.list.slice(0,5); // Display the first 5 forecast items

//     forecastItems.forEach(item => {
//         const date = new Date(item.dt * 1000); // Convert UNIX timestamp to Date object
//         date.setDate(date.getDate() + 1); // Add one day

//         const temperature = item.main.temp;
//         const description = item.weather[0].description;
//         const humidity = item.main.humidity;
//         const windSpeed = item.wind.speed;

//         const forecastHTML = `
//             <div class="forecast-item">
//                 <p>Date: ${date.toDateString()}</p>
//                 <p>Temperature: ${temperature} K</p>
//                 <p>Description: ${description}</p>
//                 <p>Humidity: ${humidity}%</p>
//                 <p>Wind Speed: ${windSpeed} m/s</p>
//             </div>
//         `;
//         forecastDiv.insertAdjacentHTML('beforeend', forecastHTML);
//     });
// }
function displayForecast(data) {
    forecastDiv.innerHTML = ""; // Clear previous content

    const forecastItems = data.list.slice(0, 5); // Display the first 5 forecast items

    // Start with the current date
    const currentDate = new Date();
    
    // Loop through the next 5 days
    for (let i = 0; i < 5; i++) {
        const date = new Date(currentDate);
        date.setDate(date.getDate() + i); // Add one day to the current date

        // Find the forecast item corresponding to this date
        const forecastItem = forecastItems.find(item => {
            const itemDate = new Date(item.dt * 1000);
            //  date.setDate(date.getDate() + 1); // Add one day

            return itemDate.getDate() !== date.getDate();
        });

        if (forecastItem) {
            const temperature = forecastItem.main.temp;
            const description = forecastItem.weather[0].description;
            const humidity = forecastItem.main.humidity;
            const windSpeed = forecastItem.wind.speed;

            const forecastHTML = `
                <div class="forecast-item">
                    <p>Date: ${date.toDateString()}</p>
                    <p>Temperature: ${temperature} K</p>
                    <p>Description: ${description}</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind Speed: ${windSpeed} m/s</p>
                </div>
            `;
            forecastDiv.insertAdjacentHTML('beforeend', forecastHTML);
        }
    }
}

// Function to fetch weather data for a city
async function fetchForecast(cityName) {
    const apiKey = "d84a44f96fff68524d2248d02c76f4d8";
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching forecast data:", error);
        return null;
    }
}

// Event listeners for buttons
// document.getElementById("btnNewYork").addEventListener("click", async () => {
//     const weatherData = await fetchWeather("New York City");
//     displayWeather(weatherData);
// });

// document.getElementById("btnPhiladelphia").addEventListener("click", async () => {
//     const weatherData = await fetchWeather("Philadelphia");
//     displayWeather(weatherData); 
// });

// document.getElementById("btnLosAngeles").addEventListener("click", async () => {
//     const weatherData = await fetchWeather("Los Angeles");
//     displayWeather(weatherData);
// });

// document.getElementById("btnSanDiego").addEventListener("click", async () => {
//     const weatherData = await fetchWeather("San Diego");
//     displayWeather(weatherData);
// });
document.getElementById("btnNewYork").addEventListener("click", async () => {
    const weatherData = await fetchWeather("New York City");
    const forecastData = await fetchForecast("New York City");
    displayWeather(weatherData);
    displayForecast(forecastData);
});

document.getElementById("btnPhiladelphia").addEventListener("click", async () => {
    const weatherData = await fetchWeather("Philadelphia");
    const forecastData = await fetchForecast("Philadelphia");
    displayWeather(weatherData);
    displayForecast(forecastData);
});

document.getElementById("btnLosAngeles").addEventListener("click", async () => {
    const weatherData = await fetchWeather("Los Angeles");
    const forecastData = await fetchForecast("Los Angeles");
    displayWeather(weatherData);
    displayForecast(forecastData);
});

document.getElementById("btnSanDiego").addEventListener("click", async () => {
    const weatherData = await fetchWeather("San Diego");
    const forecastData = await fetchForecast("San Diego");
    displayWeather(weatherData);
    displayForecast(forecastData);
});
