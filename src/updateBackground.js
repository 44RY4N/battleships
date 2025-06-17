    const titel = document.querySelector("#titel");
    const todayLoc = document.querySelector("#todayLoc");
    const condition = document.querySelector("#condition")
    const disclaimer = document.querySelector("#disclaimer");


function updateBackground( hour = new Date().getHours()) {

  const clock = document.querySelector("#clock");
  
  console.log("hour recieved",hour)
  let gradient = '';
  if (hour >= 5 && hour < 11) {
    titel.classList.remove("night");
    todayLoc.classList.remove("night");
    condition.classList.remove("night");
    disclaimer.classList.remove("night");

    // Morning: soft blue and warm yellow
    gradient = 'linear-gradient(to top right, #FFD580, #AEE1F9)';
  } else if (hour >= 11 && hour < 17) {
    titel.classList.remove("night");
    todayLoc.classList.remove("night");
    condition.classList.remove("night");
    disclaimer.classList.remove("night");
    // Afternoon: light blue and bright
    gradient = 'linear-gradient(to top right, #87CEFA, #FFFFFF)';
  } else if (hour >= 17 && hour < 20) {
    titel.classList.remove("night");
    todayLoc.classList.remove("night");
    condition.classList.remove("night");
    disclaimer.classList.remove("night");
    // Evening: orange, purple, blue
    gradient = `linear-gradient(to bottom, #003366 0%, #ff99cc 100%)`;
  } else {
    // Night: blue, purplish black

    titel.classList.add("night");
    todayLoc.classList.add("night");
    condition.classList.add("night");
    disclaimer.classList.add("night");

    let baseUrl = clock.src;
    let urls = baseUrl.split("/tct");
    let newUrl = urls[0] + "/tcffffff" + urls[1];
    clock.src = newUrl;

    gradient = 'linear-gradient(to top right, #0D1B2A, #1B263B, #415A77)';
  }

  document.body.style.background = gradient;
  document.body.style.backgroundAttachment = 'fixed'; // optional for nicer effect
}

export {updateBackground}

