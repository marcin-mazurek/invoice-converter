const app = require('electron').remote;
const fs = require('fs');

module.exports = function (content) {
  return new Promise((resolve, reject) => {
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
    const defaultPath = `faktura-${date}.xml`;

    app.dialog.showSaveDialog({ defaultPath }, fileName => {
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
