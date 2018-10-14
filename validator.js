const ajv = new require('ajv')();
const schema = require('./order-schema.json');

module.exports = ajv.compile(schema);
