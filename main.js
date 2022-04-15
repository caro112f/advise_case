import "./sass/style.scss";
import {
  getHostData,
  getbytesData,
  cleanPsImgData,
  cleanPsJsData,
  getCo2Data,
} from "./scripts/data.js";

const form = document.querySelector("form");
let barValue;
let imgValue;
let jsValue;
let hostValue;
let imgSavedPer;

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("Mr. Plant says Welcome");
  form.addEventListener("submit", getUrl);
}

function getUrl(event) {
  let inputUrl = form.url.value;
  event.preventDefault();
  loadAni();
  prepareData(inputUrl);
}

function loadAni() {
  const loader = document.querySelector(".loader");
  loader.classList.remove("hidden");
  loader.classList.remove("right");
  form.removeEventListener("submit", getUrl);
}

function prepareData(inputUrl) {
  //combining url from form with our carbon
  //no longer used in order to avoid errors during presentation
  const carbonApi = "https://kea-alt-del.dk/websitecarbon/site/?url=";
  loadJSON(carbonApi.concat(inputUrl));
}

//GET DATA
async function loadJSON(fullCarbonUrl) {
  //const cResponse = await fetch(fullCarbonUrl); //HOW WE GOT DATA FROM URL LIVE
  //our actual live result
  console.log(fullCarbonUrl);

  const cResponse = await fetch("ttv.json");
  const jsonCarbonData = await cResponse.json();

  const speedResponse = await fetch("ttv_fullspeed.json");
  const jsonSpeedData = await speedResponse.json();
  getData(jsonCarbonData, jsonSpeedData);
}

function getData(jsonCarbonData, jsonSpeedData) {
  let carbonHostData = getHostData(jsonCarbonData);
  let carbonBytesData = getbytesData(jsonCarbonData);
  let carbonCo2Data = getCo2Data(jsonCarbonData);
  let imgSavedKib = cleanPsImgData(jsonSpeedData);
  let jsSavedKib = cleanPsJsData(jsonSpeedData);
  imgSavedPer = 0.5 * (imgSavedKib / (imgSavedKib + jsSavedKib));

  calculateBarValue(carbonHostData, imgSavedKib, jsSavedKib);
  calculateTech(carbonBytesData, carbonCo2Data);
}

function calculateBarValue(carbonHost, imgKib, jsKib) {
  hostValue = calculateHost(carbonHost);
  imgValue = calculateImg(imgKib);
  jsValue = calculateJs(jsKib);

  barValue = hostValue + imgValue + jsValue;
  //console.log(barValue);
  setTimeout(stopLoad, 2000);
}

function calculateTech(carbonBytesData, carbonCo2Data) {
  const byteResult = document.querySelector("#bytes-to-load");
  const co2Result = document.querySelector("#grams-of-co2");
  byteResult.textContent = carbonBytesData + " kibibytes";
  co2Result.textContent = carbonCo2Data + " grams";
}

function stopLoad() {
  const loader = document.querySelector(".loader");
  window.location.href = "#results";
  loader.classList.add("right");
  form.url.value = "";
  document.querySelector("header").classList.add("hiddenhide");
  document.querySelector("#results").classList.remove("hiddenhide");
  document.querySelector("#technical_facts").classList.remove("hiddenhide");

  // adding eventlisteners to impact buttons
  document
    .querySelector("#greenhost-btn")
    .addEventListener("click", reCalculateHost);
  document.querySelector("#img-btn").addEventListener("click", reCalculateImg);
  document.querySelector("#js-btn").addEventListener("click", reCalculateJs);
  document.querySelector(".try-again-btn").addEventListener("click", reset);

  setTimeout(function () {
    showBarResult(barValue);
  }, 2000);

  setTimeout(showPlantMood, 2000);
}

function calculateHost(carbonHost) {
  if (carbonHost === "unknown") {
    return 0;
  } else {
    return 0.5 * 100;
  }
}

function calculateImg(imgKib) {
  return exponentialCurve(imgKib) * imgSavedPer;
}

function calculateJs(jsKib) {
  return exponentialCurve(jsKib) * (0.5 - imgSavedPer);
}

function exponentialCurve(x) {
  return Math.pow(Math.E, (Math.log(0.5) / 200) * x);
}

function showPlantMood() {
  const plant = document.querySelector(".plant-sprite");
  if (barValue >= 0 && barValue < 0.2) {
    plant.src = "/05.png";
  } else if (barValue >= 0.2 && barValue < 0.4) {
    plant.src = "/04.png";
  } else if (barValue >= 0.4 && barValue < 0.6) {
    plant.src = "/03.png";
  } else if (barValue >= 0.6 && barValue < 0.8) {
    plant.src = "/02.png";
  } else {
    plant.src = "/01.png";
  }
}

function showBarResult(barValue) {
  let result = document.querySelector("#result_per");

  barValue = Math.round(barValue * 10000) / 100;
  result.textContent = barValue + "%";
  const bar = document.querySelector(".barometer");
  bar.style.width = barValue + "%";
  result.classList.remove("hide");
  //result.style.visibility = "visible";
}

function reCalculateHost() {
  hostValue = 0.5;
  barValue = hostValue + imgValue + jsValue;
  let hostBtn = document.querySelector("#greenhost-btn");
  hostBtn.removeEventListener("click", reCalculateHost);
  hostBtn.classList.add("deactivated");
  hostBtn.classList.remove("card-btn");
  showPlantMood();
  showBarResult(barValue);
}

function reCalculateImg() {
  imgValue = imgSavedPer;
  barValue = hostValue + imgValue + jsValue;
  let imgBtn = document.querySelector("#img-btn");

  imgBtn.removeEventListener("click", reCalculateImg);
  imgBtn.classList.add("deactivated");
  imgBtn.classList.remove("card-btn");
  showPlantMood();
  showBarResult(barValue);
}

function reCalculateJs() {
  jsValue = 0.5 - imgSavedPer;
  barValue = hostValue + imgValue + jsValue;

  let jsBtn = document.querySelector("#js-btn");
  jsBtn.removeEventListener("click", reCalculateJs);
  jsBtn.classList.add("deactivated");
  jsBtn.classList.remove("card-btn");
  showPlantMood();
  showBarResult(barValue);
}

function reset() {
  document.querySelector(".try-again-btn").removeEventListener("click", reset);
  barValue = "";
  imgValue = "";
  jsValue = "";
  hostValue = "";
  imgSavedPer = "";

  document.querySelector("#greenhost-btn").classList.remove("deactivated");
  document.querySelector("#greenhost-btn").classList.add("card-btn");

  document.querySelector("#img-btn").classList.remove("deactivated");
  document.querySelector("#img-btn").classList.add("card-btn");

  document.querySelector("#js-btn").classList.remove("deactivated");
  document.querySelector("#js-btn").classList.add("card-btn");

  document.querySelector("header").classList.remove("hiddenhide");
  document.querySelector("#results").classList.add("hiddenhide");
  document.querySelector("#technical_facts").classList.add("hiddenhide");

  document.querySelector(".plant-sprite").src = "/01.png";
  document.querySelector(".barometer").style.width = "60vw";
  document.querySelector("#result_per").classList.add("hide");
  form.addEventListener("submit", getUrl);
}
