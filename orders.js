'use strict';

const aws = require('aws-sdk');
const parseBody = require('./body-parser');
const { isRandomMode, randomOrder, timestamp, toDynamoDbItem } = require('./utils');
const { ulid } = require('ulid');
const validateOrder = require('./validator');

const dynamoDb = new aws.DynamoDB({
  region: 'eu-west-1'
});

module.exports.handler = async (event, context) => {
  if (isRandomMode(event.queryStringParameters)) {
    event.body = randomOrder();
  }
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
  const dynamoDbItem = {
    Item: {
      Id: {S: ulid()},
      Information: toDynamoDbItem(order),
      Timestamp: {N: timestamp()}
    },
    ReturnConsumedCapacity: 'TOTAL',
    TableName: 'SbuxOrders'
  };
  await dynamoDb.putItem(dynamoDbItem).promise()
  .then(data => console.log(data))
  .catch(err => console.log(err));
  return {
    body: JSON.stringify(order),
    statusCode: 200
  };
};
