import { getToday } from "./getToday.js";
import { getFifteen } from "./getFifteen.js";
import { handleTabUI } from "./handleTabUI.js";
import { handleHourlyUI } from "./handleHourlyUI.js";
import { handleFifteenUI } from "./handleFifteenUI.js";
import { updateBackground } from "./updateBackground.js";
import { state } from "./handleState.js";

const bar = document.querySelector("#bar");
const overlay = document.querySelector("#overlay");

function handleSearch() {
    bar.addEventListener("keydown", async (event) => {
        if (event.key === "Enter") {
            const city = bar.value.trim();

            if (city) {
                try {
                    overlay.style.display = "flex";

                    const todayData = await getToday(city);
                    const fifteenData = await getFifteen(city);

                    if(!todayData || !fifteenData) {
                        throw new error("data not found")
                      
                    }
            
                    handleTabUI(todayData); 
                    handleHourlyUI(todayData); 
                    handleFifteenUI(fifteenData); 
                    updateBackground(todayData.currentConditions.datetime.split(":")[0]);

                    
                     
                    setTimeout(() => {
                        overlay.style.display = "none"; 
                    }, 500); 

                    bar.value = ""; // Clear input after successful search
                    state.myLoc = false;
                } catch (error) {
                    console.error("Error fetching weather data:", error);
                    alert("Failed to fetch weather data. Please check the city name or try again later.");
                    bar.value = ""; // clear input after failure
                    setTimeout(()=>{
                        overlay.style.display = "none";
                    },2000);
                }
            } else {
                alert("Please enter a city name.");
            }
        }
    });
}

function isOnlyAlphabets(str) {
  return /^[A-Za-z]+$/.test(str);
}


export { handleSearch };