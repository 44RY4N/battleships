

const MY_KEY = "8EMF3RTDD33JWS9F2H8VPYSUY";

async function getToday(location){
let today = new Date().toISOString().split("T")[0];

try{
let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${today}/${today}?include=hours,current&iconSet=icons1&unitGroup=metric&key=${MY_KEY}`);
let myJson = await response.json();
return myJson;


} 
catch (error) {
    console.error(error.message);
}
    
}

export {getToday};