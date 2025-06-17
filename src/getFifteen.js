const MY_KEY = "8EMF3RTDD33JWS9F2H8VPYSUY";

async function getFifteen(location){

try{
let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&iconSet=icons1&key=${MY_KEY}`);
let myJson = await response.json();
return myJson;
} 
catch (error) {
    console.error(error.message);
}
    
}

export {getFifteen};