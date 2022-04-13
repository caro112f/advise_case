import "./sass/style.scss";
import {
  getHostData,
  getCleanerData,
  cleanPsImgData,
  cleanPsJsData,
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
  //loader.style.transform = "translateX(0%)";
  //loader.style.visibility = "visible";
  loader.classList.remove("hidden");
  loader.classList.remove("right");
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
  imgSavedPer = 0.5 * (imgSavedKib / (imgSavedKib + jsSavedKib));
  //console.log(carbonHostData, carbonCleanerData, imgSavedKib, jsSavedKib);

  calculateBarValue(carbonHostData, imgSavedKib, jsSavedKib);
}

function calculateBarValue(carbonHost, imgKib, jsKib) {
  hostValue = calculateHost(carbonHost);
  imgValue = calculateImg(imgKib);
  jsValue = calculateJs(jsKib);

  barValue = hostValue + imgValue + jsValue;
  //console.log(barValue);

  //showResults();
  setTimeout(stopLoad, 2000);
}

function stopLoad() {
  const loader = document.querySelector(".loader");
  //loader.style.position = "sticky";
  window.location.href = "#results";
  loader.classList.add("right");
  document.querySelector("#results").style.display = "block";

  //setTimeout(makeBarResult(barValue), 2000);
  // makeBarResult(barValue);
  document
    .querySelector("#greenhost-btn")
    .addEventListener("click", reCalculateHost);
  document.querySelector("#img-btn").addEventListener("click", reCalculateImg);
  document.querySelector("#js-btn").addEventListener("click", reCalculateJs);
  setTimeout(function () {
    showBarResult(barValue);
  }, 2000);
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
  showBarResult(barValue);
}

function reCalculateImg() {
  imgValue = imgSavedPer;
  barValue = hostValue + imgValue + jsValue;
  let imgBtn = document.querySelector("#img-btn");

  imgBtn.removeEventListener("click", reCalculateImg);
  imgBtn.classList.add("deactivated");
  imgBtn.classList.remove("card-btn");
  showBarResult(barValue);
}

function reCalculateJs() {
  jsValue = 0.5 - imgSavedPer;
  barValue = hostValue + imgValue + jsValue;

  let jsBtn = document.querySelector("#js-btn");
  jsBtn.removeEventListener("click", reCalculateJs);
  jsBtn.classList.add("deactivated");
  jsBtn.classList.remove("card-btn");
  showBarResult(barValue);
}
