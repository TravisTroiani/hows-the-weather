// const form = document.getElementById('search-form');
// const cityInput = document.getElementById('city-input');
// const currentWeatherDiv = document.getElementById('current-weather');
// const forecastDiv = document.getElementById('forecast');
// const searchHistoryDiv = document.getElementById('search-history');

// form.addEventListener('submit', async function(event) {
//     event.preventDefault();
//     const cityName = cityInput.value.trim();
//     if (cityName === '') {
//         alert('Please enter a city name.');
//         return;
//     }

//     try {
//         const apiKey = "d84a44f96fff68524d2248d02c76f4d8";
//         const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
//         const response = await fetch(apiUrl);
//         if (!response.ok) {
//             throw new Error('Weather data not available.');
//         }
//         const data = await response.json();
//         displayWeather(data);
//     } catch (error) {
//         console.error(error);
//         alert('Error fetching weather data.');
//     }
// });

// function displayWeather(data) {
//     const cityName = data.name;
//     const temperature = data.main.temp;
//     const description = data.weather[0].description;
//     const humidity = data.main.humidity;
//     const windSpeed = data.wind.speed;

//     const weatherHTML = `
//         <h2>${cityName}</h2>
//         <p>Temperature: ${temperature} K</p>
//         <p>Description: ${description}</p>
//         <p>Humidity: ${humidity}%</p>
//         <p>Wind Speed: ${windSpeed} m/s</p>
//     `;
//     currentWeatherDiv.innerHTML = weatherHTML;
// }
// // Function to fetch weather data for a city
// async function fetchWeather(cityName) {
//     const apiKey = "d84a44f96fff68524d2248d02c76f4d8";
//     const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  
//     try {
//       const response = await fetch(apiUrl);
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error fetching weather data:", error);
//       return null;
//     }
//   }
  
//   // Function to fetch weather data for a city
// async function fetchWeather(cityName) {
//     const apiKey = "d84a44f96fff68524d2248d02c76f4d8";
//     const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  
//     try {
//       const response = await fetch(apiUrl);
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error fetching weather data:", error);
//       return null;
//     }
//   }
  
//   // Event listeners for buttons
//   document.getElementById("btnNewYork").addEventListener("click", async () => {
//     const weatherData = await fetchWeather("New York City");
//     displayWeather(weatherData);
//   });
  
//   document.getElementById("btnPhiladelphia").addEventListener("click", async () => {
//     const weatherData = await fetchWeather("Philadelphia");
//     displayWeather(weatherData);
//   });
  
//   document.getElementById("btnLosAngeles").addEventListener("click", async () => {
//     const weatherData = await fetchWeather("Los Angeles");
//     displayWeather(weatherData);
//   });
  
//   document.getElementById("btnSanDiego").addEventListener("click", async () => {
//     const weatherData = await fetchWeather("San Diego");
//     displayWeather(weatherData);
//   });
  
//   // Function to display weather information
//   function displayWeather(weatherData) {
//     const weatherInfoDiv = document.getElementById("weatherInfo");
//     weatherInfoDiv.innerHTML = ""; // Clear previous content
  
//     if (!weatherData) {
//       weatherInfoDiv.textContent = "Failed to fetch weather data.";
//       return;
//     }
  
//     const cityName = weatherData.name;
//     const temperature = Math.round(weatherData.main.temp - 273.15); // Convert Kelvin to Celsius
//     const description = weatherData.weather[0].description;
//     const humidity = weatherData.main.humidity;
//     const windSpeed = weatherData.wind.speed;
  
//     const weatherInfoHTML = `
//       <h2>${cityName}</h2>
//       <p>Temperature: ${temperature}°C</p>
//       <p>Description: ${description}</p>
//       <p>Humidity: ${humidity}%</p>
//       <p>Wind Speed: ${windSpeed} m/s</p>
//     `;
  
//     weatherInfoDiv.innerHTML = weatherInfoHTML;
//   }
const form = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const currentWeatherDiv = document.getElementById('current-weather');
const forecastDiv = document.getElementById('forecast');
const searchHistoryDiv = document.getElementById('search-history');

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

function displayForecast(data) {
    forecastDiv.innerHTML = ""; // Clear previous content

    const forecastItems = data.list.slice(0, 5); // Display the first 5 forecast items

    forecastItems.forEach(item => {
        const date = new Date(item.dt * 1000); // Convert UNIX timestamp to Date object
        const temperature = item.main.temp;
        const description = item.weather[0].description;
        const humidity = item.main.humidity;
        const windSpeed = item.wind.speed;

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
    });
}

// Function to fetch weather data for a city
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

// Event listeners for buttons
document.getElementById("btnNewYork").addEventListener("click", async () => {
    const weatherData = await fetchWeather("New York City");
    displayWeather(weatherData);
});

document.getElementById("btnPhiladelphia").addEventListener("click", async () => {
    const weatherData = await fetchWeather("Philadelphia");
    displayWeather(weatherData);
});

document.getElementById("btnLosAngeles").addEventListener("click", async () => {
    const weatherData = await fetchWeather("Los Angeles");
    displayWeather(weatherData);
});

document.getElementById("btnSanDiego").addEventListener("click", async () => {
    const weatherData = await fetchWeather("San Diego");
    displayWeather(weatherData);
});
