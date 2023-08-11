console.log("Script load successfully");
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const search = document.getElementById("search")
const find = document.getElementById("find")
const currentDay = document.getElementById("currentDay")
const currentDate = document.getElementById("currentDate")
const currentLocation = document.getElementById("currentLocation")
const currentTemp = document.getElementById("currentTemp")
const currentTempIcon = document.getElementById("currentTempIcon")
const currentStatus = document.getElementById("currentStatus")
const currentWindKph = document.getElementById("currentWindKph")
const currentPrecip = document.getElementById("currentPrecip")
const currentWindDir = document.getElementById("currentWindDir")
const day1 = document.getElementById("day1")
const day2 = document.getElementById("day2")
async function getCurrentDataWeather(city) {
    let data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=7fe9e21bab5e40bb979203531230508&q=${city}&days=3&aqi=no&alerts=no`)
    let currentData = await data.json()
    
    displayCurrentWeather(currentData)
    displayDay1(currentData,1)
    displayDay2(currentData, 2)
}

getGeoLocatoinData()
// getCurrentDataWeather(`cairo`)
function displayCurrentWeather(currentResponse) {

    try {
        currentDay.innerText = days[new Date(currentResponse.location.localtime).getDay()]
        currentDate.innerText = `${new Date(currentResponse.location.localtime).getDate()} ` + months[new Date(currentResponse.location.localtime).getMonth()]
        currentLocation.innerText = currentResponse.location.name
        currentTemp.innerText = currentResponse.current.temp_c + `°C`
        currentTempIcon.setAttribute("src", currentResponse.current.condition.icon)
        currentStatus.innerText = currentResponse.current.condition.text
        currentWindKph.innerText = currentResponse.current.wind_kph + ` Km/h`
        currentPrecip.innerText = currentResponse.current.precip_in + ` %`
        currentWindDir.innerText = currentResponse.current.wind_dir
    
} catch (error) {
    
}

   
}
function displayDay1(day1Response,dayNumber) {
   try {
       let foreCastDayArr = day1Response.forecast.forecastday

       day1.innerHTML = `<p class=" midHead px-2 py-2">
                        <span class="text-secondary fs-6">${days[new Date(foreCastDayArr[dayNumber].date).getDay()]}</span>
                    </p>
                    <div class=" ">
                        <div class="d-flex flex-column justify-content-between align-items-center">
                            <img src="${foreCastDayArr[dayNumber].day.condition.icon}" alt="" class="w-25 mb-3">
                            <span class="text-white fs-5 mb-1 fw-medium">${foreCastDayArr[dayNumber].day.maxtemp_c}</span>
                            <span class="text-secondary fs-6 mb-3">${foreCastDayArr[dayNumber].day.mintemp_c}</span>
                            <span class="text-primary fs-6 mb-3">${foreCastDayArr[dayNumber].day.condition.text}</span>
                        </div>
                    </div>`
   } catch (error) {
    
   }
   
}
function displayDay2(day2Response, dayNumber) {
    try {
        let foreCastDayArr = day2Response.forecast.forecastday
        day2.innerHTML = `<p class=" midHead px-2 py-2 rounded-top-4 rounded-start-0">
                        <span class="text-secondary fs-6">${days[new Date(foreCastDayArr[dayNumber].date).getDay()]}</span>
                    </p>
                    <div class=" ">
                        <div class="d-flex flex-column justify-content-between align-items-center">
                            <img src="${foreCastDayArr[dayNumber].day.condition.icon}" alt="" class="w-25 mb-3">
                            <span class="text-white fs-5 mb-1 fw-medium">${foreCastDayArr[dayNumber].day.maxtemp_c}</span>
                            <span class="text-secondary fs-6 mb-3">${foreCastDayArr[dayNumber].day.mintemp_c}</span>
                            <span class="text-primary fs-6 mb-3">${foreCastDayArr[dayNumber].day.condition.text}</span>
                        </div>
                    </div>`
        
    } catch (error) {
        
    }
   
}
search.addEventListener("input",function () {
    getCurrentDataWeather(search.value)
})
find.addEventListener("click", function () {
    getCurrentDataWeather(search.value)
})




function getGeoLocatoinData() {
    let coordinateCurrentLocation 
    if (navigator.geolocation) {
        // Get current position
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        // Geolocation is not supported by this browser
        alert("Geolocation is not supported by this browser.");
    }
    // Succvar latess callback function
    function showPosition(position) {
        // Get coordinates
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        // Display coordinates on the console  
        let coordinateCurrentLocation

        coordinateCurrentLocation = lat + `,` + lon
        console.log(coordinateCurrentLocation);
        getCurrentDataWeather(coordinateCurrentLocation)
        
    }
    // Error callback function
    function showError(error) {
        switch (error.code) {
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
    
    console.log(coordinateCurrentLocation);
    
    
}
