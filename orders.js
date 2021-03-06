'use strict';

const aws = require('aws-sdk');
const { ulid } = require('ulid');

const parseBody = require('./body-parser');
const processPayment = require('./payments');
const { isRandomMode, randomOrder, timestamp, toDynamoDbItem } = require('./utils');
const validateOrder = require('./validator');

const dynamoDb = new aws.DynamoDB({
  region: 'eu-west-1'
});

const dynamoDbTableName = process.env.DYNAMODB_TABLE_NAME;

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
  let authorizationCode = null;
  try {
    authorizationCode = await processPayment({});
    console.log(`Authorization code: ${authorizationCode}`);
  } catch(err) {
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
    TableName: dynamoDbTableName
  };
  await dynamoDb.putItem(dynamoDbItem).promise()
  .then(data => console.log(data))
  .catch(err => console.log(err));
  return {
    body: JSON.stringify(order),
    statusCode: 200
  };
};
