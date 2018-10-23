const menuDescriptor = require('./menu.json');

module.exports = {
  isRandomMode: queryStringParameters => {
    if (queryStringParameters === null) { return false; }
    return queryStringParameters.random === 'true';
  },
  randomOrder: () => {
    const order = menuDescriptor[Math.floor(Math.random() * menuDescriptor.length)];
    return JSON.stringify(Object.assign({}, order, {price: undefined}));
  },
  timestamp: () => Date.now().toString()
};
