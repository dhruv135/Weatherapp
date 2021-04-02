//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

//080dcca4e64bfdd5a6e854931a8536fd

const weatherApi = {
    key: "080dcca4e64bfdd5a6e854931a8536fd",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}



let inputBox = document.querySelector("input");
inputBox.addEventListener("keypress", function(event){
    if(event.keyCode ===13 ){
        var inpval = inputBox.value;
        startForcasting(inpval);
       
    }
});

function startForcasting(inpval){
    getWeatherReport(inpval)
    .then(showWeatherReport)
    .catch(err => {
                alert(err);
          });
}



async function getWeatherReport(city){

    const data = await fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`);
    const fetch_data = await data.json();
    console.log(fetch_data);
    if(fetch_data.message === "city not found")
    throw "City Not Found";
    else{
    return fetch_data;
    }
    
}





function showWeatherReport(weather){
    document.getElementById("we-info").style.display = "block";
    
    let cit = document.getElementById("city");
    
    cit.innerHTML = `<p class="animate__animated animate__zoomIn" id="city-info">${weather.name}, ${weather.sys.country}</p>`;


    let tempt = document.getElementById("temperature");
    tempt.innerHTML = `<p class="animate__animated animate__zoomIn" id="temp-info">${Math.round(weather.main.temp)}&deg;C</p>`;


    let minMax = document.getElementById("min-max");
    minMax.innerHTML = `<p class="animate__animated animate__zoomIn" id="min-max-info">${Math.round(weather.main.temp_min)}&deg;C (min)/ ${Math.round(weather.main.temp_max)}&deg;C (max)</p>`
    
    
    let weatherType = document.getElementById("weather-type");
    weatherType.innerHTML = `<p class="animate__animated animate__zoomIn" id="weather-type-info">${weather.weather[0].main}</p>`;


    let date1 = document.getElementById("date");
    let todayDate = new Date();
    date1.innerHTML = `<p class="animate__animated animate__zoomIn" id="date-info">${dateManage(todayDate)}</p>`;
    inputBox.value="";
    console.log(weather);
}


function dateManage(datearg){
    let days = ["Sunday","Monday","Tuesday","Wenesday","Thursday","Friday","Saturday"];
    let months = ["Junuary","February","March","April","May","June","July","August","September","October","November",
    "December"];
    let date = datearg.getDate();
    let year = datearg.getFullYear();
    let month = months[datearg.getMonth()];
    let day = days[datearg.getDay()];
    return `${date} ${month}  (${day}), ${year}`;

}






