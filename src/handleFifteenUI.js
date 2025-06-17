import { getIconURL } from "./getIconURL.js";

function handleFifteenUI(daysFif) {
    const container = document.querySelector("#longContainer");
    container.innerHTML = ""; //empty old content;
    const fragment = document.createDocumentFragment(); // using fragment to optimize performance

    for (let day of daysFif.days) {

        let mydate = day.datetime;
        let mytemp = day.temp;

        let mytempmax = day.tempmax;
        let mytempmin = day.tempmin;

        let myicon = day.icon;
        let myconditions = day.conditions;
        let myprecip = day.precipprob;

        let card = document.createElement("div");
        card.classList.add("card");

        let cardDate = document.createElement("div");
        cardDate.classList.add("card-date");
        cardDate.textContent = `Date: ${mydate}`;

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

        let cardMaxMin = document.createElement("div");
        cardMaxMin.textContent = `${mytempmax}°C | ${mytempmin}°C`;
        cardMaxMin.classList.add("card-max-min");



        card.appendChild(cardDate);
        card.appendChild(cardCond);
        card.appendChild(cardTemp);
        card.appendChild(cardIcon);
        card.appendChild(cardPrecip);
        card.appendChild(cardMaxMin);

        fragment.appendChild(card); 
    }

    container.appendChild(fragment); 
}

export { handleFifteenUI };