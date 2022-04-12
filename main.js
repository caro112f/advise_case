import "./sass/style.scss";
import {
  getHostData,
  getCleanerData,
  cleanPsImgData,
  cleanPsJsData,
} from "./scripts/data.js";

const form = document.querySelector("form");
let barValue;

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("Mr. Plant says Welcome");
  form.addEventListener("submit", getUrl);
}

function getUrl(event) {
  let inputUrl = form.url.value;
  event.preventDefault();
  prepareData(inputUrl);
}

function prepareData(inputUrl) {
  const carbonApi = "https://kea-alt-del.dk/websitecarbon/site/?url=";
  loadJSON(carbonApi.concat(inputUrl));
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
  //console.log(carbonHostData, carbonCleanerData, imgSavedKib, jsSavedKib);

  calculateBarValue(carbonHostData, imgSavedKib, jsSavedKib);
}

function calculateBarValue(carbonHost, imgKib, jsKib) {
  let hostValue = calculateHost(carbonHost);
  let imgValue = calculateImg(imgKib);
  let jsValue = calculateJs(jsKib);

  barValue = hostValue + imgValue + jsValue;
  //console.log(barValue);
  makeBarResult(barValue);
}

function calculateHost(carbonHost) {
  if (carbonHost === "unknown") {
    return 0;
  } else {
    return 0.5 * 100;
  }
}

function calculateImg(imgKib) {
  return exponentialCurve(imgKib);
}

function calculateJs(jsKib) {
  return exponentialCurve(jsKib);
}

function exponentialCurve(x) {
  return 0.25 * Math.pow(Math.E, (Math.log(0.5) / 1000) * x);
}

function makeBarResult(barValue) {
  let result = document.querySelector("#result_per");

  barValue = Math.round(barValue * 10000) / 100;
  result.textContent = barValue + "%";
  const bar = document.querySelector(".barometer");
  bar.style.width = barValue + "%";

  result.style.visibility = "visible";

  console.log(bar.style.width);
}

//give number to bar
//get the amount of bytes as number
//put through math function
//add to total result

//funktion der linker barometer med cleanerthan
