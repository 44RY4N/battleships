import { getIconURL } from "./getIconURL.js";

function handleHourlyUI(today) {
    const container = document.querySelector("#hourlyContainer");
    container.innerHTML = ""; //empty old content;
    const fragment = document.createDocumentFragment(); // using fragment to optimize performance

    for (let hour of today.days[0].hours) {

        let mydate = hour.datetime;
        let mytemp = hour.temp;
        let myicon = hour.icon;
        let myconditions = hour.conditions;
        let myprecip = hour.precipprob;
        let mywind = hour.windspeed;

        let card = document.createElement("div");
        card.classList.add("card");

        let cardDate = document.createElement("div");
        cardDate.classList.add("card-date");
        cardDate.textContent = `Time: ${mydate}`;

        let cardCond = document.createElement("div");
        cardCond.textContent = myconditions;
        cardCond.classList.add("card-conditions");

        let cardTemp = document.createElement("div");
        cardTemp.textContent = `${mytemp}°C`;
        cardTemp.classList.add("card-temp");

        let cardIcon = document.createElement("img");
        cardIcon.src = getIconURL(myicon);
        cardIcon.classList.add("card-icon");

        let cardPrecip = document.createElement("div");
        cardPrecip.textContent = `Precipitation: ${myprecip}%`;
        cardPrecip.classList.add("card-precip");

        let cardWind = document.createElement("div");
        cardWind.textContent = `Wind: ${mywind} km/h`;
        cardWind.classList.add("card-wind");
        
        card.appendChild(cardDate);
        card.appendChild(cardCond);
        card.appendChild(cardTemp);
        card.appendChild(cardIcon);
        card.appendChild(cardPrecip);
        card.appendChild(cardWind);

        

        fragment.appendChild(card); 
    }

    container.appendChild(fragment); 
}

export { handleHourlyUI };