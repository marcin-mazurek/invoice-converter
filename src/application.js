const DragAndDrop = require('./drag-and-drop');
const preventPageChangeOnFileDrop = require('./prevent-page-change-on-file-drop');

function runApplication() {
  preventPageChangeOnFileDrop();
  const dragAndDrop = new DragAndDrop(document.getElementById('dragAndDropArea'));
}

runApplication();