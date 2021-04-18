function displayTempreture(response) {
  console.log(response.data);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let tempretureElement = document.querySelector("#temperature");
  tempretureElement.innerHTML = Math.round(response.data.main.temp);
}

let apiKey = "d5d27ecfdc1457c7467f81c731c8279f";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;
console.log(apiURL);
axios.get(apiURL).then(displayTempreture);
