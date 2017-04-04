const initializeDragAndDrop = require('./view/drag-and-drop');
const preventPageChangeOnFileDrop = require('./view/prevent-page-change-on-file-drop');

function runApplication() {
  preventPageChangeOnFileDrop();
  initializeDragAndDrop(document.getElementById('dragAndDropArea'));
}

runApplication();
