const menuDescriptor = require('./menu.json');

module.exports = {
  randomOrder: () => {
    const order = menuDescriptor[Math.floor(Math.random() * menuDescriptor.length)];
    return JSON.stringify(Object.assign({}, order, {price: undefined}));
  }
};
