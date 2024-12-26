const cityInput = document.querySelector('.city-input');
const toolTip = document.querySelector('.tooltip');
const errorIcon = document.querySelector('.icon-error');
const WeatherBtn = document.querySelector('#fetch-weather');
const weather = document.querySelector('.weather-display');

WeatherBtn.addEventListener('click', async () => {
  // Reset error states
  cityInput.classList.remove('error');
  errorIcon.style.display = 'none';
  toolTip.style.display = 'none';

  weather.innerHTML = ''; // Clear previous weather display

  const API_KEY = 'Input your API Key';

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${API_KEY}&units=metric`; // url for the the openweather and the parameters we need.

    const response = await fetch(url); //Making an API call

    // If no city name is entered, show error
    if (!cityInput.value) {
      cityInput.classList.add('error');
      errorIcon.style.display = 'block';
      toolTip.style.display = 'block';
      toolTip.textContent = 'Please enter a city name!';
    } else if (!response.ok) {
      // If city is not found, show error
      cityInput.classList.add('error');
      errorIcon.style.display = 'block';
      toolTip.style.display = 'block';
      toolTip.textContent = 'City not found!';
    } else {
      const data = await response.json(); // parse JSON response

      //   extract just the weather temperature, description, and icon
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const weatherImage = data.weather[0].main;

      // Display the weather info
      weather.innerHTML = `
        <img src="${weatherImage}" alt="Weather Img" class="weather-img">
  <p class="weather-info"><span>Temperature:</span> ${temperature}°C</p>
  <p class="weather-description"><span>Description:</span> ${description}</p>
      `;

      switch (weatherImage) {
        case 'Clouds':
          document.querySelector('.weather-img').src = '/assets/cloud.png';
          break;
        case 'Clear':
          document.querySelector('.weather-img').src = '/assets/clear.png';
          break;
        case 'Rain':
          document.querySelector('.weather-img').src = '/assets/rain.png';
          break;
        case 'Mist':
          document.querySelector('.weather-img').src = '/assets/mist.png';
          break;
        case 'Snow':
          document.querySelector('.weather-img').src = '/assets/snow.png';
          break;
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
});
