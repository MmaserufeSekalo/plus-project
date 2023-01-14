let now = new Date();
let hour = now.getHours();
if (hour < 10) {
  hour = "0" + hour;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  " Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let time = hour + ":" + minutes;

let dayElement = document.querySelector("#date");
let timeElement = document.querySelector("#time");
dayElement.innerHTML = day;
timeElement.innerHTML = time;

function displayTemperature(position) {
  let cityElement = document.querySelector("#current-location");
  let temperatureElement = document.querySelector("#current-temp");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#current-icon");
  cityElement.innerHTML = position.data.city;
  temperatureElement.innerHTML = Math.round(position.data.temperature.current);
  descriptionElement.innerHTML = position.data.condition.description;
  humidityElement = position.data.temperature.humidity;
  windElement.innerHTML = Math.round(position.data.wind.speed);
  iconElement.setAttribute("src", position.data.condition.icon_url);

  celsiusTemperature = position.data.temperature.current;
}
function searchCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#search").value;
  let keys = "b4b16ao0bed60a37cdt0a5dcdf865c3b";
  let searchApi = `https://api.shecodes.io/weather/v1/current?query=${newCity}&key=${keys}`;
  axios.get(searchApi).then(displayTemperature);
}

let searchButton = document.querySelector("#search-input");
searchButton.addEventListener("click", searchCity);

function currentLocationData(current) {
  let city = current.data.city;
  let key = "b4b16ao0bed60a37cdt0a5dcdf865c3b";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}`;

  axios.get(url).then(displayTemperature);
}

function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "b4b16ao0bed60a37cdt0a5dcdf865c3b";
  let currentUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
  axios.get(currentUrl).then(currentLocationData);
}

navigator.geolocation.getCurrentPosition(currentLocation);

function fahChange(event) {
  event.preventDefault();
  let imperialTemp = Math.round((celsiusTemperature * 9) / 5 + 32);
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = imperialTemp;
}
let celsiusTemperature = null;
let fah = document.querySelector("#imperial");
fah.addEventListener("click", fahChange);

function celChange(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusChange = document.querySelector("#metric");
celsiusChange.addEventListener("click", celChange);
