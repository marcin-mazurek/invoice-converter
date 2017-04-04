const app = require('electron').remote;
const fs = require('fs');

function generateFileName() {
  const date = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  })
  .split('/')
  .join('-')
  .split(', ')
  .join('-')
  .split(':')
  .join('-');

  return `faktura-${date}.xml`;
}

module.exports = function (content) {
  return new Promise((resolve, reject) => {
    app.dialog.showSaveDialog({ defaultPath: generateFileName() }, fileName => {
      if (fileName === undefined) {
        resolve();
        return;
      }

      fs.writeFile(fileName, content, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
};
