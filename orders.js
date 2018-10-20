'use strict';

const parseBody = require('./body-parser');
const validateOrder = require('./validator');

module.exports.handler = async (event, context) => {
  const parsedBody = parseBody(event.body);
  if (parsedBody === undefined) {
    return {
      body: '',
      statusCode: 400
    };
  }
  const order = validateOrder(parsedBody);
  if (order === undefined) {
    return {
      body: '',
      statusCode: 400
    };
  }
  return {
    body: JSON.stringify(order),
    statusCode: 200
  };
};
