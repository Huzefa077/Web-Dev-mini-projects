const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container"); 
// common in both

//Grant Access location
const grantAccessContainer = document.querySelector(".grant-location-container");

//Search weather
const searchForm = document.querySelector("[data-searchForm]");

//Loading screen
const loadingScreen = document.querySelector(".loading-container");

const userInfoContainer = document.querySelector(".user-info-container");

let currentTab = userTab;
const API_key = "e02bf734e960b661d46b5fca0e771631";
currentTab.classList.add("current-tab");

// Clear session storage to reset grant access permission
sessionStorage.removeItem("user-coordinates");

//ek kaam aur pending hai ??
getfromSessionStorage();

function switchTab(clickedTab){
    //color bg switching of tabs
    if(clickedTab != currentTab){
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");

        //pata nahi konse tab se konse ta me jana hai apne ko click krne pr,
        //we are writing both conditions here by checking which 
        //one doesnt have active class becasue it means it is not 
        // visible despite being clicked.
        
        //hiding current tab contents with new clicked one.
        //agar user tab pr rahte hue search form ko click kiya.
        if(!searchForm.classList.contains("active")){
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        //agar search tab pr rahte hue user form ko click kiya.
        else{
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            //its common content in both tabs.
            //ab me your weather tab me agaya hu to weather bhi display karna padeaga,
            //so let's check local storage first for coordinates, if we saved them there.
            getfromSessionStorage();  
        }
    }
}

//when user clicks YOUR WEATHER
userTab.addEventListener("click", () => {
    //pass clicked tab as input parameter
    switchTab(userTab);
});

//when user clicks Search Weather
searchTab.addEventListener("click", () => {
    //pass clicked tab as input parameter
    switchTab(searchTab);
});

function getfromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        // agar local coordinates nahi hai, matlba location access nahi mila hai.
        grantAccessContainer.classList.add("active");
    }
    else{
        //agar local coordinates hai tab unhe use karo, and call using API
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}  

async function fetchUserWeatherInfo(coordinates){
    const {lat, lon } = coordinates;
    //make grantcontainer invisible
    grantAccessContainer.classList.remove("active");
    //make loading screen visible
    loadingScreen.classList.add("active");
    //API call
    try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`
        );
        const data = await response.json();
        loadingScreen.classList.remove("active");
        //display user info
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err){
        loadingScreen.classList.remove("active");   
        console.log("error occurred due to ", err);
    }
}

function renderWeatherInfo(weatherInfo){
    //We need location, city, country, temperature, weather, icon, wind, humidity, cloudiness, and for that I need to fetch the elements.
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const wind = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    //fetch values from weatherInfo object and put it UI elements
    if (cityName) cityName.innerText = weatherInfo?.name;
    if (countryIcon) countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    if (desc) desc.innerText = weatherInfo?.weather?.[0]?.description;
    if (weatherIcon) weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    if (temp) temp.innerText = `${weatherInfo?.main?.temp}°C`;
    if (wind) wind.innerText = `${weatherInfo?.wind?.speed} m/s`;
    if (humidity) humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    if (cloudiness) cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;
}

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
    else{
        alert("Geolocation is not supported by this browser");
    }
}

function showPosition(position){
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    }
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", () => {
    // Clear session storage to reset grant access permission
    sessionStorage.removeItem("user-coordinates");
    getLocation();
});

let searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === ""){
        alert("Please enter a city name");
        return;
    }
    else{
        fetchSearchWeatherInfo(cityName);
    }
});

async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`
        );
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    } 
    catch (error) {
        loadingScreen.classList.remove("active");
        console.log("error occurred due to ", error);
    }
}