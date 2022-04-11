export function getHostData(jsonOject) {
  return jsonOject.green;
}

export function getCleanerData(jsonOject) {
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

export function cleanPsImgData(jsonOject) {
  let imageData = jsonOject.lighthouseResult.audits["modern-image-formats"];
  let imgSavedKibString = imageData.displayValue;
  return cleanData(imgSavedKibString);
}

export function cleanPsJsData(jsonOject) {
  let jsData = jsonOject.lighthouseResult.audits["unused-javascript"];
  let jsSavedKibString = jsData.displayValue;
  return cleanData(jsSavedKibString);
}

function cleanData(data) {
  return parseInt(data.split(" ")[3].slice(0, -4));
}
