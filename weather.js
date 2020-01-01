const weather = document.querySelector(".js-weather");

const API_KEY = "4ad0d3b77cf1a035f46b316b722e6a47";
const COORDS = "coords";

function getWeather(lat, lng){
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  ).then(function(response){
    return response.json();
  })
  .then(function(json){
    const temp = json.main.temp;
    const place = json.name;
    weather.innerText = `${temp} @ ${place}`;
  });
}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const coordsObj = {
    latitude:lat,
    longitude:lng
  };
  saveCoords(coordsObj);
  getWeather(lat, lng);
}

function handleGeoError(){
  console.log("Cant access geo location");
}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
    askForCoords();
  }
  else{
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init(){
  loadCoords();
}

init();
