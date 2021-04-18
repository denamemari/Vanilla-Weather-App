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
}

function search(city) {
  let apiKey = "d5d27ecfdc1457c7467f81c731c8279f";

  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayTempreture);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayfarentemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celLink.classList.remove("#active");
  farenLink.classList.add("#active");
  let farenTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenTemperature);
}

function displayceltemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  farenLink.classList.remove("#active");
  celLink.classList.add("#active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farenLink = document.querySelector("#faren");
farenLink.addEventListener("click", displayfarentemperature);

let celLink = document.querySelector("#cel");
celLink.addEventListener("click", displayceltemperature);

search("New York");
