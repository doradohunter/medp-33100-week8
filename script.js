let backgroundMap = new Image();
backgroundMap.src = 'usa_map.jpg'; 
let cityInput;
let weatherSprite;
let canvas, context;

const mapGeoLeft = -125.0;  
const mapGeoRight = -67.0;  
const mapGeoTop = 50.0;     
const mapGeoBottom = 24.0;  

class WeatherSprite {
  constructor(x, y, city, temperature) {
    this.x = x;
    this.y = y;
    this.city = city;
    this.temperature = temperature;
  }

  display() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.drawImage(backgroundMap, 0, 0, canvas.width, canvas.height);

    context.fillStyle = "#FF0000";
    context.font = "17px Comic Sans MS";
    context.textAlign = "center";

    context.fillText(this.city, this.x, this.y - 30);
    
    context.font = "28px Comic Sans MS";
    context.fillText(this.temperature + "°C", this.x, this.y);
  }

  animate() {
    gsap.fromTo(this, { y: this.y - 20 }, { y: this.y + 20, duration: 2, yoyo: true, repeat: -1 });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  canvas = document.getElementById('weatherCanvas');
  context = canvas.getContext('2d');
  cityInput = document.getElementById('city-input');
  cityInput.addEventListener('change', () => {
    const cityName = cityInput.value;
    loadWeather(cityName);
  });
});

function loadWeather(cityName) {
  const apiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log("Geocoding API response:", data); // Add this line to log the response

      if (data.results && data.results.length > 0) {
        const lat = data.results[0].latitude;
        const lon = data.results[0].longitude;
        const city = data.results[0].name;

        console.log("City:", city, "Lat:", lat, "Lon:", lon);  // Add this line to log lat/lon
        fetchWeather(lat, lon, city);
      } else {
        console.error('City not found');
        displayMessage("City not found.");
      }
    })
    .catch(error => {
      console.error('Error fetching city coordinates:', error);
      displayMessage("Error fetching city coordinates.");
    });
}

function fetchWeather(lat, lon, city) {
  if (!lat || !lon) {  // Ensure lat/lon are valid
    console.error('Latitude or longitude is missing');
    displayMessage("Invalid latitude or longitude.");
    return;
  }

  const weatherUrl = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;

  fetch(weatherUrl)
    .then(response => response.json())
    .then(data => {
      const temperature = data.properties.timeseries[0].data.instant.details.air_temperature;

      let xgeo = mapCoordinates(lon, mapGeoLeft, mapGeoRight, 0, canvas.width);
      let ygeo = mapCoordinates(lat, mapGeoBottom, mapGeoTop, canvas.height, 0);

      weatherSprite = new WeatherSprite(xgeo, ygeo, city, temperature);
      weatherSprite.display();
      weatherSprite.animate();
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
    const weatherData = {
      city: city,
      temperature: temperature,
      lat: lat,
      lon: lon,
      timestamp: new Date().toISOString() //I asked chatgpt for this part
    };
    localStorage.setItem(`weatherData_${city}`, JSON.stringify(weatherData));
    displayWeatherData(weatherData);
  }
function mapCoordinates(value, minGeo, maxGeo, minScreen, maxScreen) {
  return ((value - minGeo) / (maxGeo - minGeo)) * (maxScreen - minScreen) + minScreen;
}
