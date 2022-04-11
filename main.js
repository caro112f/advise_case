import "./sass/style.scss";

const form = document.querySelector("form");

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("Hej URL");

  form.addEventListener("submit", getUrl);
}

function getUrl(event) {
  let inputUrl = form.url.value;
  //console.log(inputUrl);
  event.preventDefault();
  prepareData(inputUrl);
}

function prepareData(inputUrl) {
  const carbonApi = "https://kea-alt-del.dk/websitecarbon/site/?url=";
  let fullCarbonUrl = carbonApi.concat(inputUrl);
  //console.log(fullUrl);
  //let fullPagespeedUrl = pageSpeedApi.concat(inputUrl);
  loadJSON(fullCarbonUrl);
}
//GET DATA
async function loadJSON(fullCarbonUrl) {
  const cResponse = await fetch(fullCarbonUrl);
  const jsonCarbonData = await cResponse.json();
  //console.log(jsonData);
  const speedResponse = await fetch("ttv_fullspeed.json");
  const jsonSpeedData = await speedResponse.json();
  //console.log(jsonSpeedData)
  getData(jsonCarbonData, jsonSpeedData);
}

function getData(jsonCarbonData, jsonSpeedData) {
  let carbonHostData = getHostData(jsonCarbonData);
  let carbonCleanerData = getCleanerData(jsonCarbonData);
  let imgSavedKib = cleanPsImgData(jsonSpeedData);
  let jsSavedKib = cleanPsJsData(jsonSpeedData);
  console.log(carbonHostData, carbonCleanerData, imgSavedKib, jsSavedKib);

  calculateHost();
  calculateSaved();
}

function getHostData(jsonOject) {
  return jsonOject.green;
}

function getCleanerData(jsonOject) {
  return jsonOject.cleanerThan;
}

/* function cleanCarbonData(jsonOject) {
  let greenHost = jsonOject.green;
  let cleaner = jsonOject.cleanerThan;
  //console.log(greenHost, cleaner);
  //checkUrlData();
  //calculateHost();
  return { greenHost, cleaner };
} */

function cleanPsImgData(jsonOject) {
  let imageData = jsonOject.lighthouseResult.audits["modern-image-formats"];
  let imgSavedKibString = imageData.displayValue;
  return cleanData(imgSavedKibString);
}

function cleanPsJsData(jsonOject) {
  let jsData = jsonOject.lighthouseResult.audits["unused-javascript"];
  let jsSavedKibString = jsData.displayValue;
  return cleanData(jsSavedKibString);
}

function cleanData(data) {
  return parseInt(data.split(" ")[3].slice(0, -4));
}

function calculateHost() {
  if (greenHost === "unknown") {
    console.log("This is bad or unknown host");
  } else {
    console.log("This is a green host");
  }
}

//get the amount of bytes as number
//put through math function
//add to total result

function calculateResult() {
  if (greenHost == true && imgOptimized == true) {
    let score = 1;
    return score;
  } else if (
    (greenHost == false && imgOptimized == true) ||
    (greenHost == true && imgOptimized == false)
  ) {
    let score = 0.5;
    return score;
  } else {
    let score = 0;
    return score;
  }
}

//funktion der linker barometer med cleanerthan
