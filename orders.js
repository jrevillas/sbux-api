'use strict';

const parseBody = require('./body-parser');
const isOrderValid = require('./validator');

module.exports.handler = async (event, context) => {
  const parsedBody = parseBody(event.body);
  if (parsedBody === undefined) {
    return {
      body: '',
      statusCode: 400
    };
  }
  if (!isOrderValid(parsedBody)) {
    return {
      body: '',
      statusCode: 400
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };
};
