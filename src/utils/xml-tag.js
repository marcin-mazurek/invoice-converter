module.exports = function (name, attrs, content) {
  const joinedAttrs = Object.keys(attrs).map(attr => `${attr}="${attrs[attr]}"`).join(' ');

  if (content) {
    const stringContent = content.length ? content.join('') : content;
    return `<${name} ${joinedAttrs}>${stringContent}</${name}>`;
  } else {
    return `<${name} ${joinedAttrs} />`;
  }
};
