const ajv = new require('ajv')();
const hash = require('./hash-generator');
const menuDescriptor = require('./menu.json');
const schema = require('./order-schema.json');

const isOrderValid = ajv.compile(schema);
const menu = Object.assign({}, ...menuDescriptor.map(x => ({[hash(x)]: x})));

module.exports = parsedBody => {
  if (!isOrderValid(parsedBody)) { return undefined; }
  return menu[hash(parsedBody)];
}
