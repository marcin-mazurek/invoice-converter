module.exports = function() {
  document.ondragover = document.ondrop = (event) => {
    event.preventDefault();
  };
}