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
  timestamp: () => Date.now().toString(),
  toDynamoDbItem: order => ({
    M: Object.keys(order).filter(key => order[key] !== '').reduce((acc, key) => {
      if (key === 'price') { acc[key] = {N: order[key]} }
      else { acc[key] = {S: order[key]} }
      return acc;
    }, {})
  })
};
