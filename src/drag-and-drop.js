const handleFileUpload = require('./handle-file-upload');
const parseFile = require('./parse-file');

class DragAndDrop {
  constructor(rootElement) {
    this.root = rootElement;
    this.stackTrace = this.root.querySelector('#errorStackTrace');

    this.root.addEventListener('dragenter', () => this.setState('dragging'));
    this.root.addEventListener('dragleave', () => this.setState('normal'));
    this.root.addEventListener('drop', this.handleDrop.bind(this), false);
    this.root.querySelector('#errorDetailsButton')
      .addEventListener('click', () => this.setState('error-detailed'));
  }

  handleDrop(event) {
    this.setState('processing');

    handleFileUpload(event)
      .then(file => {
        const parsedFile = parseFile(file);
        console.log(parsedFile);
        document.body.innerHTML = `<pre>${JSON.stringify(parsedFile)}</pre>`;
        this.setState('normal');
      })
      .catch(error => {
        this.setState('error');
        this.setError(error);
      });
  }

  setState(state) {
    this.root.className = 'drag-and-drop-area';

    if (state !== 'normal') {
      this.root.classList.add(state);
    }
  }

  setError(error) {
    this.stackTrace.innerHTML = error.stack.split('\n').join('<br/>');
  }
}

module.exports = DragAndDrop;
