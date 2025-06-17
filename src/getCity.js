import { getLocation } from "./getLocation.js";
const MY_KEY = "d513718170e04caf92451ba06c335a1f";

async function getMyCity() {
  try {
    const coords = await getLocation();
    console.log(`coords sent to getCity = ${coords}`);
    const myCoord = `${coords.latitude}%2C+${coords.longitude}`;
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${myCoord}&key=${MY_KEY}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const myJSON = await response.json();
    console.log(myJSON.results[0].components);
    return myJSON.results[0].components;
  } catch (error) {
    console.error("Error in getCity:", error.message);
    throw error;
  }
}

async function getCity(meraCoord) {

  try {
      let meraArray =  meraCoord.split(",");
      let meraLatitude = meraArray[0].trim();
      let meraLongitude = meraArray[1].trim();


      let asliCoord = `${meraLatitude}%2C+${meraLongitude}`;
      const meraResponse = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${asliCoord}&key=${MY_KEY}`);
          if (!meraResponse.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const meraJSON = await meraResponse.json();

    return meraJSON.results[0].components;
  }
  catch (error) {
    console.error("Error in getCity:", error.message);
    throw error;
  }
}

export { getMyCity, getCity};