//declare variables and elements
// °
const userCity = localStorage.getItem("userCity");
const userCountry = localStorage.getItem("userCountry");
const userLat = Number(localStorage.getItem("userLatitude"));
const userLon = Number(localStorage.getItem("userLongitude"));
const apiKey = `0b6ee3e8b2ffd5633d2402696d57cc66`;
const imgURLS = {
  '01d' : "../assets/weather/icons8-sun.svg",
  '02d': "../assets/weather/icons8-weather.svg",
  '03d': "../assets/weather/icons8-partly-cloudy-day.svg",
  '04d': "../assets/weather/icons8-partly-cloudy-day.svg",
  '09d': "../assets/weather/icons8-rain-cloud.svg",
  '10d': "../assets/weather/icons8-light-rain.svg",
  '11d': "../assets/weather/icons8-storm-with-heavy-rain.svg",
  '13d': "../assets/weather/icons8-snow.svg",
  '50d': "../assets/weather/icons8-dust.svg",
};
const weatherLogo = document.getElementById("tempIcon");
const temperature = document.querySelector(".temp");
const dayType = document.querySelector(".dayType");
const locality = document.querySelector(".local");
const feels = document.getElementById("feelsLike");
const wind = document.getElementById("wind");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

//DOMContentLoaded

window.addEventListener('DOMContentLoaded', () =>{
    if(!userLat){
        apiCity();
    }else{
        apiLatLon();
    }
    
})





//functions

//api using user entered city name
const apiCity = async () =>{
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();
      console.log(data);
      const temp = Math.round(Number(data.main.temp));
      const type = data.weather[0].main;
      const location = data.name;
      const feel = Math.round(Number(data.main.feels_like)) + `°C <br> Feels Like`;
      const winds = data.wind.speed + `m/s`;
      const srT = unixToIN(data.sys.sunrise);
      const ssT = unixToIN(data.sys.sunset);
      let logo = data.weather[0].icon;
      logo = logo[0]+logo[1]+ 'd';
      setView(logo,temp,type,location,feel,winds,srT,ssT);
}

// api using user location

const apiLatLon = async () => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLon}&units=metric&appid=${apiKey}`
  );
  const data = await response.json();
  const temp = Math.round(Number(data.main.temp));
  const type = data.weather[0].main;
  const location = data.name;
  const feel = Math.round(Number(data.main.feels_like)) + `°C <br> Feels Like`;
  const winds = data.wind.speed + `m/s`;
  const srT = unixToIN(data.sys.sunrise);
  const ssT = unixToIN(data.sys.sunset);
  let logo = data.weather[0].icon;
  logo = logo[0]+logo[1]+ 'd'; 
  setView(logo,temp,type,location,feel,winds,srT,ssT);
};


const setView = (ll,degree, dType, loc, fl, wi, sr, ss) => {
  temperature.textContent = degree;
  dayType.textContent = dType;
  weatherLogo.src = imgURLS[ll];
  locality.textContent = loc;
  feels.innerHTML = fl;
  wind.textContent = wi;
  sunrise.textContent = sr;
  sunset.textContent = ss;
  
};

const unixToIN = (t) =>{
    let date = new Date(t * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    if(minutes.length === 3){
        minutes = minutes[1] + minutes[2];
    }
    const data = hours +`:`+minutes;
    return data
}