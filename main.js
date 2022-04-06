import "./sass/style.scss";
import "./sass/style.scss";

const urlCalculater = "https://kea-alt-del.dk/websitecarbon/site/?url=";
//const ttvData = ttv.json;

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("Hej Calculater");
  calculateUrl();
}

function calculateUrl() {
  const form = document.querySelector("form");
  let url = form.elements.url.value;
  console.log(url);
  //let result =
  //urlCalculater +
  //`https://kea-alt-del.dk/websitecarbon/site/?url=https://${url}`;
  //console.log(result);

  //console.log(result);
}
