import "./sass/style.scss";

const form = document.querySelector("form");
let greenHost;
let cleaner;

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

  let fullUrl = carbonApi.concat(inputUrl);
  //console.log(fullUrl);
  loadJSON(fullUrl);
}

async function loadJSON(fullUrl) {
  const response = await fetch(fullUrl);
  const jsonData = await response.json();
  //console.log(jsonData);
  cleanData(jsonData);
}

function cleanData(jsonOject) {
  greenHost = jsonOject.green;
  cleaner = jsonOject.cleanerThan;
  console.log(greenHost, cleaner);
  //checkUrlData();
}

//function checkUrlData() {}

/* function cleanData(jsonData) {
  allData = jsonData.map(createData);
  console.log(allData);
    dataProperties.cleaner = jsonOject.cleanerThan;
} */
