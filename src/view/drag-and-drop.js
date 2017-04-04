const handleFileUpload = require('../files/handle-file-upload');
const saveFile = require('../files/save-file');
const parseFile = require('../parser/parse-file');
const convertToXml = require('../parser/convert-to-xml');

class DragAndDrop {
  constructor(rootElement) {
    this.root = rootElement;
    this.stackTrace = this.root.querySelector('#errorStackTrace');
  }

  initialize() {
    this.root.addEventListener('dragenter', () => this._setState('dragging'));
    this.root.addEventListener('dragleave', () => this._setState('normal'));
    this.root.addEventListener('drop', this._handleDrop.bind(this), false);
    this.root.querySelector('#errorDetailsButton')
      .addEventListener('click', () => this._setState('error-detailed'));
  }

  _handleDrop(event) {
    this._setState('processing');

    handleFileUpload(event)
      .then(file => {
        const invoice = parseFile(file);
        const xml = convertToXml(invoice);
        return saveFile(xml);
      })
      .then(() => this._setState('normal'))
      .catch(error => {
        this._setState('error');
        this._setError(error);
      });
  }

  _setState(state) {
    this.root.className = 'drag-and-drop-area';

    if (state !== 'normal') {
      this.root.classList.add(state);
    }
  }

  _setError(error) {
    this.stackTrace.innerHTML = error.stack.split('\n').join('<br/>');
  }
}

module.exports = function (rootElement) {
  new DragAndDrop(rootElement).initialize();
};
