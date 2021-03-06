const fs = require('fs');
const { join } = require('path');

function getDetails(data) {
  const matadata = data.match(/---(.*\n)*---/)[0];
  const details = matadata.match(/(.*):(.*)/g).reduce((obj, detail) => {
    const value = detail.substr(detail.indexOf(':') + 2);
    const key = detail.substr(0, detail.indexOf(':'));
    obj[key] = value;
    return obj;
  }, {});
  details.keywords = details.keywords || '';
  return details;
}

function getBody(data) {
  let body = data
    .replace(/---(.*\n)*---/, '')
    .replace(/\[.*\]\(.*\)/g, '')
    .replace(/\n/, '');
  return body;
}

function getPreview(data) {
  let preview = data
    .replace(/---(.*\n)*---/, '')
    .replace(/\[.*\]\(.*\)/g, '')
    .replace(/\n/, '');
  return preview.split('\n').filter((line) => line)[0];
}

function getFolders(source) {
  const isDirectory = (source) => fs.lstatSync(source).isDirectory();
  const isValidFile = (source) =>
    !fs.lstatSync(source).isDirectory() && source.endsWith('.md');
  const getAllListings = (source) =>
    fs.readdirSync(source).map((name) => join(source, name));
  let allContent = getAllListings(source);
  const edges = allContent.filter(isValidFile).map((file) => {
    const data = fs.readFileSync(file, 'utf-8');
    const details = getDetails(data);
    return {
      title: details.title,
      details,
      preview: getPreview(data),
      body: getBody(data),
    };
  });
  const nodes = allContent.filter(isDirectory).map((dir) => getFolders(dir));
  const result = {
    id: source.substr(source.lastIndexOf('/') + 1),
  };
  if (nodes.length) {
    result.nodes = nodes;
  }
  if (edges.length) {
    result.edges = edges;
  }
  return result;
}

function generateFileList(src) {
  return getFolders(src);
}

module.exports = {
  generateFileList,
};
