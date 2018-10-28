const axios = require('axios');

const pvGatewayEndpoint = process.env.PAYVISION_GATEWAY_ENDPOINT;
const pvMemberGuid = process.env.PAYVISION_MEMBER_GUID;
const pvMemberId = process.env.PAYVISION_MEMBER_ID;

const processPayment = async paymentInformation => {
  try {
    return '8MA5N';
  } catch(err) {}
}

module.exports = processPayment;
