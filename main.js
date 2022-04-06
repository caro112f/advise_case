import "./sass/style.scss";

//const urlCalculater = "https://kea-alt-del.dk/websitecarbon/site/?url=";
//const form = document.querySelector("form");

//const ttvData = ttv.json;
const form = document.querySelector("form");

const Dataobj = {
  green: "",
  cleanerThan: "",
};

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("Hej Calculater");

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
  console.log(fullUrl);
  loadJSON(fullUrl);
}

async function loadJSON(fullUrl) {
  const response = await fetch(fullUrl);
  const jsonData = await response.json();
  console.log(jsonData);
}

// GET API
/* 
function calculateUrl(url) {
  console.log(url);

  const carbonApi = "https://kea-alt-del.dk/websitecarbon/site/?url=";

  const response = await fetch(carbonApi + url);
  const data = await response.json();
  
}







 function calculateUrl() {
  const form = document.querySelector("form");
  //let inputUrl = form.elements.url.value;
  console.log(url);
  let result = urlCalculater.concat("https://www.twitch.tv/");
  //urlCalculater +
  //`https://kea-alt-del.dk/websitecarbon/site/?url=https://${url}`;
  //console.log(result);

  console.log(result);
} 
 */
