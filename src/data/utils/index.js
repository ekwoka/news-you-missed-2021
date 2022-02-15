function getDetails(data) {
  const matadata = data.match(/---(.*\n)*---/)[0];
  const details = matadata.match(/(.*):(.*)/g).reduce((obj, detail) => {
    const value = detail.substr(detail.indexOf(':') + 2);
    const key = detail.substr(0, detail.indexOf(':'));
    obj[key] = value;
    return obj;
  }, {});
  return details;
}

function getBody(md) {
  return md.replace(/---(.*\n)*---/, '');
}

function getMD(md) {
  return [getDetails(md), getBody(md)];
}

const articleMDOptions = {
  wrapper: 'article',
  forceWrapper: true,
  overrides: {},
};

export { getMD, articleMDOptions };
