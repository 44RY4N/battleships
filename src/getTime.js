const timeZoneToLocationId = {
  "Africa/Abidjan": "n1",
  "Africa/Nairobi": "n171",
  "America/Adak": "n4",
  "America/Anchorage": "n14",
  "America/Argentina/Buenos_Aires": "n35",
  "America/Atikokan": "n19",
  "America/Bogota": "n33",
  "America/Chicago": "n61",
  "America/Denver": "n79",
  "America/Godthab": "n106",
  "America/Halifax": "n108",
  "America/Los_Angeles": "n64",
  "America/Mexico_City": "n155",
  "America/New_York": "n179",
  "America/Phoenix": "n188",
  "America/Sao_Paulo": "n215",
  "America/St_Johns": "n224",
  "Antarctica/Mawson": "n246",
  "Asia/Bangkok": "n23",
  "Asia/Dhaka": "n80",
  "Asia/Dubai": "n84",
  "Asia/Kolkata": "n54",
  "Asia/Shanghai": "n217",
  "Asia/Tokyo": "n248",
  "Asia/Yangon": "n264",
  "Australia/Adelaide": "n2",
  "Australia/Brisbane": "n37",
  "Australia/Perth": "n187",
  "Australia/Sydney": "n236",
  "Europe/Berlin": "n28",
  "Europe/London": "n85",
  "Europe/Moscow": "n162",
  "Pacific/Auckland": "n18",
  "Pacific/Chatham": "n58",
  "Pacific/Fiji": "n90",
  "Pacific/Honolulu": "n113",
  "Pacific/Kiritimati": "n132",
  "Pacific/Marquesas": "n150",
  "Pacific/Niue": "n181"
};
const clock = document.querySelector("#clock");

async function getTime(tZone) {

  let myCode = timeZoneToLocationId[tZone]
  const baseUrl = `https://free.timeanddate.com/clock/i9xnrfgm/${myCode}/fn6/fs24/tct/pct/ftb/pa2/th2/h12/s1`;

  console.log("tZone recieved: ",tZone);
  console.log("code fetched: ",myCode);

  clock.src = baseUrl;


}

export { getTime };