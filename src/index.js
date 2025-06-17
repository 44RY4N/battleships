import {updateBackground} from "./updateBackground.js";
import {getToday} from "./getToday.js";
import {handleTabUI} from "./handleTabUI.js";
import {handleHourlyUI} from "./handleHourlyUI.js";
import {getFifteen} from "./getFifteen.js";
import {handleFifteenUI} from "./handleFifteenUI.js";
import {handleSearch} from "./handleSearch.js";
import {handleLocation} from "./handleLocation.js";
import "./styles.css";

let defaultCity = "lucknow";
let overlay = document.querySelector("#overlay");




async function setDefault(){
try{

  overlay.style.display = "flex";
  let today = await getToday(defaultCity);
  handleTabUI(today);
  handleHourlyUI(today);

  let fifteen = await getFifteen(defaultCity);
  handleFifteenUI(fifteen);

  handleSearch();
  handleLocation();

  setTimeout(()=>{
    overlay.style.display = "none";
  },500);

}
catch(err){
  console.error("Can't handle Today", err.message);
    setTimeout(()=>{
    overlay.style.display = "none";
  },500);
}
}

updateBackground();
setDefault();

