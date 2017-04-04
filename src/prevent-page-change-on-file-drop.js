const preventDefault = event => event.preventDefault();

module.exports = function () {
  document.addEventListener('dragover', preventDefault);
  document.addEventListener('drop', preventDefault);
};
