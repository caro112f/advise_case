export function getHostData(jsonOject) {
  return jsonOject.green;
}

export function getbytesData(jsonOject) {
  let bytesData = parseInt(jsonOject.bytes);
  let kibiByes = bytesData / 1024;

  let roundedData = Math.round(100 * kibiByes) / 100;

  console.log(roundedData);
  return roundedData;
}

export function getCo2Data(jsonOject) {
  return Math.round(100 * jsonOject.statistics.co2.grid.grams) / 100;
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

export function getAvgByte(jsonOject) {
  let byteList = [];
  jsonOject.forEach((obj) => {
    byteList.push(obj.bytes);
  });

  return Math.round((100 * calculateAvg(byteList)) / 1024) / 100;
}

export function getAvgCo2(jsonOject) {
  let co2List = [];
  jsonOject.forEach((obj) => {
    co2List.push(obj.statistics.co2.grid.grams);
  });

  return Math.round(100 * calculateAvg(co2List)) / 100;
}

function calculateAvg(list) {
  let total = 0;
  list.forEach((obj) => {
    total = total + obj;
  });

  return total / list.length;
}
