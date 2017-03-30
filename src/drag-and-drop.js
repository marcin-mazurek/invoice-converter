const handleFileUpload = require('./handle-file-upload');

class DragAndDrop {
  constructor(element) {
    this.element = element;

    this.element.addEventListener('dragenter', () => this.setState('dragging'));
    this.element.addEventListener('dragleave', () => this.setState('normal'));
    this.element.addEventListener('drop', this.handleDrop.bind(this), false);
  }

  handleDrop(event) {
    this.setState('processing');

    handleFileUpload(event)
      .then(file => {
        const parsedFile = parseFile(file);
        console.log(parsedFile);
        this.setState('normal');
      })
      .catch(console.error);
  }

  setState(state) {
    this.element.classList.remove('dragging');
    this.element.classList.remove('processing');

    if (state !== 'normal') {
      this.element.classList.add(state);
    }
  }
}

module.exports = DragAndDrop;