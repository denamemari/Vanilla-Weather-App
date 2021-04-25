function formatDate(timeStamp) {
  let date = new Date(timeStamp);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
      
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayHourlyForecast(response) {
  forecastHourly = response.data.hourly;
  var H = new Date().getHours();
  let forecastHourlyElement = document.querySelector("#hourlyForecast");

  let forecastHourlyHTML = `<div class="row">`;
  forecastHourly.forEach(function (forecastHr, index1) {
    if (index1 < 6) {
      forecastHourlyHTML =
        forecastHourlyHTML +
        `
      <div class="col-2">
      
        <div class="weather-hourlyforecast-hour">${index1 + H}</div>
            <img
            src="http://openweathermap.org/img/wn/${
              forecastHr.weather[0].icon
            }@2x.png"
                  alt=""
                  width="42"/>
        <div class="weather-hourlyforecast-temperatures">
        <span class="weather-hourlyforecast-temperature"> ${Math.round(
          forecastHr.temp
        )}° </span>
                
                
              </div>
            </div>
   `;
    }
  });

  forecastHourlyHTML = forecastHourlyHTML + `</div>`;
  forecastHourlyElement.innerHTML = forecastHourlyHTML;
}

function getForecast(coordinates) {
  let apiKey = "d5d27ecfdc1457c7467f81c731c8279f";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiURL).then(displayForecast);
  axios.get(apiURL).then(displayHourlyForecast);
}
function displayTempreture(response) {
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  let tempretureElement = document.querySelector("#temperature");
  tempretureElement.innerHTML = Math.round(celsiusTemperature);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("alt", response.data.weather[0].description);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "d5d27ecfdc1457c7467f81c731c8279f";

  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiURL).then(displayTempreture);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New York");

var t = new Date().getHours();
if (t < 10) {
  document.body.style.backgroundColor = "#fefecc";
} else if (t < 20) {
  document.body.style.backgroundColor = "#ffc288";
} else {
  document.body.style.backgroundColor = "#325288";
}
