import "./sass/style.scss";

const form = document.querySelector("form");
let greenHost;
let cleaner;
let imgOptimized;

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

async function loadJSON(fullCarbonUrl) {
  const cResponse = await fetch(fullCarbonUrl);
  const jsonCarbonData = await cResponse.json();
  //console.log(jsonData);
  const speedResponse = await fetch("ttv_fullspeed.json");
  const jsonSpeedData = await speedResponse.json();
  //console.log(jsonSpeedData)
  cleanData(jsonCarbonData);
}

function cleanData(jsonOject) {
  greenHost = jsonOject.green;
  cleaner = jsonOject.cleanerThan;
  console.log(greenHost, cleaner);
  //checkUrlData();
  calculateHost();
}

function calculateHost() {
  if (greenHost === "unknown") {
    console.log("This is bad or unknown host");
  } else {
    console.log("This is a green host");
  }
}

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

//function checkUrlData() {}

/* function cleanData(jsonData) {
  allData = jsonData.map(createData);
  console.log(allData);
    dataProperties.cleaner = jsonOject.cleanerThan;
} */
