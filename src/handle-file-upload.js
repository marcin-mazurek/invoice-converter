const XLSX = require('xlsx');

function handleFileLoaded(event, resolve, reject) {
  try {
    const data = event.target.result;
    const workbook = XLSX.read(data, { type: 'binary' });
    resolve(workbook);
  } catch (error) {
    reject(error);
  }
}

function readFile(file, resolve, reject) {
  const reader = new FileReader();
  reader.onload = function(event) {
    handleFileLoaded(event, resolve, reject);
  };
  reader.readAsBinaryString(file);
}

module.exports = function (event) {
  event.preventDefault();

  return new Promise((resolve, reject) => {
    const file = event.dataTransfer.files[0];
    readFile(file, resolve, reject);
  });
};
