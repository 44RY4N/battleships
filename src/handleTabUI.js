import {getIconURL} from "./getIconURL.js";
import {updateFlag} from "./updateFlag.js";
import { getCity } from "./getCity.js";
import { getTime} from "./getTime.js"
async function handleTabUI(location){

    console.log("location in handleUI");
    console.log(location);

    let currentCondition = location.currentConditions.icon;
    let iconURL = getIconURL(currentCondition);

    let condition = document.querySelector("#condition");
    condition.textContent = location.currentConditions.conditions;

    let iconELement = document.querySelector("#today-icon");
    iconELement.src = iconURL;

    let todayTemp = document.querySelector("#today-temp");
    todayTemp.textContent = `${location.currentConditions.temp}°C`;




    let city = document.querySelector("#city");
    city.textContent = location.resolvedAddress.split(",")[0];

    if(hasNumber(city.textContent)){
        console.log("non alphabets detected")
       let myCityyy = await getCity(location.resolvedAddress);
    }


    let country = document.querySelector("#country");
    country.textContent = `,${location.resolvedAddress.split(",").at(-1)}`;

    if(hasNumber(country.textContent)){
         console.log("non alphabets detected")
        let myCountryyy = await getCity(location.resolvedAddress);
        country.textContent = `,${myCountryyy.country}`;
    }

    let feels = document.querySelector("#feels");
    feels.textContent = ` ${location.currentConditions.feelslike}°C`;

    let feelsData = document.querySelector("#feelsdata");
    feelsData.textContent = `(${location.days[0].feelslikemax}°C/${location.days[0].feelslikemin}°C)`;

    let high = document.querySelector("#high");
    high.textContent = `${location.days[0].tempmax}°C`

    let low = document.querySelector("#low");
    low.textContent = `${location.days[0].tempmin}°C`

    let rise = document.querySelector("#rise");
    rise.textContent = `${location.days[0].sunrise} am`;

    let set = document.querySelector("#set");
    set.textContent = `${location.days[0].sunset} pm`;

    let wind = document.querySelector("#wind-speed");
    wind.textContent = `Currently ${location.currentConditions.windspeed} km/hr`;
    updateFlag(location.currentConditions.windspeed);

    let rain = document.querySelector("#rain");
    rain.textContent = `${location.currentConditions.precipprob} %`;

    let uv = document.querySelector("#uv");
    uv.textContent = `${location.currentConditions.uvindex}`;

   let time = await getTime(location.timezone);


}

function hasNumber(str) {
  return /\d/.test(str);
}



export {handleTabUI}