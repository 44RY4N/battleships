import { getMyCity } from "./getCity.js";
import { state } from "./handleState.js";
import { getToday } from "./getToday.js";
import { getFifteen } from "./getFifteen.js";
import { handleTabUI } from "./handleTabUI.js";
import { handleHourlyUI } from "./handleHourlyUI.js";
import { handleFifteenUI } from "./handleFifteenUI.js";
import { updateBackground } from "./updateBackground.js";

const loc = document.querySelector("#loc");
const overlay = document.querySelector("#overlay");

function handleLocation() {

    loc.addEventListener("click", async () => {

        if (state.myLoc) {return alert("currently at your location");}

        try {
            overlay.style.display = "flex";
            const myCity = (await getMyCity()).city;

            if (!myCity) throw new Error("No city found");

            const todayData = await getToday(myCity);
            const fifteenData = await getFifteen(myCity);

 
            handleTabUI(todayData);
            handleHourlyUI(todayData);
            handleFifteenUI(fifteenData);
            updateBackground();

            state.myLoc = true;
        } catch (error) {
            console.error("Error fetching weather data:", error);
            alert("Failed to fetch weather data. Please try again.");
            state.myLoc = false;
        } finally {
            overlay.style.display = "none";
        }
    });
}


export { handleLocation };