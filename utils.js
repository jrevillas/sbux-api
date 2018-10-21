const menuDescriptor = require('./menu.json');

module.exports = {
  randomOrder: () => {
    const order = menuDescriptor[Math.floor(Math.random() * menuDescriptor.length)];
    delete order.price;
    return JSON.stringify(order);
  }
};
