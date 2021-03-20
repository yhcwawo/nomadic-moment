const weather =  document.querySelector(".js-weather");

const COORDS = "coords";
const API_KEY = "aed5ec3be229189c004a164dbd667030";

function getWeather(lat, lon){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){

        const temperature = json.main.temp;
        const temp_max = json.main.temp_max;
        const temp_min = json.main.temp_min;
        const pressure = json.main.pressure;
        const humidity = json.main.humidity;
        const main = json.weather[0]['main'];
        const description = json.weather[0]['description'];
        const place =json.name;

        weather.innerText = `Today ${place} is ${main}
                        Detail : ${description} 
                        Temperature : ${temperature}℃  
                        Minimum : ${temp_min}℃
                        Maximum : ${temp_max}℃
                        Pressure : ${pressure}p 
                        Humidity : ${humidity}p`;
    });
 
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function loadCoords(){
    const loadCoords = localStorage.getItem(COORDS);
    if(loadCoords === null){
        askForCoords();
    } else {
        const parseCoords =  JSON.parse(loadCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function handleGeoSuccess(position){
    const latitude = (position.coords.latitude);
    const longitude = (position.coords.longitude);
    const coordsObj = {
        latitude : latitude,
        longitude : longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(position){
    console.log("Can't access");
}

function init(){
    loadCoords();
}


init();