const axios = require('axios');

const pvGatewayEndpoint = process.env.PAYVISION_GATEWAY_ENDPOINT;
const pvMemberGuid = process.env.PAYVISION_MEMBER_GUID;
const pvMemberId = process.env.PAYVISION_MEMBER_ID;

const processPayment = async paymentInformation => {
  try {
    const res = await axios.post(pvGatewayEndpoint, {
      amount: '100',
      avsAddress: '',
      avsZip: '',
      cardExpiryMonth: '',
      cardExpiryYear: '',
      cardholder: '',
      cardNumber: '',
      cardCvv: '',
      countryId: '724', // Spain
      currencyId: '978', // EUR
      dbaCity: '',
      dbaName: '',
      memberGuid: pvMemberGuid,
      memberId: pvMemberId,
      merchantAccountType: '1',
      trackingMemberCode: ''
    });
    if (res.data.authorization_code !== undefined) {
      return res.data.authorization_code;
    }
    throw new Error();
  } catch(err) {
    console.log('error dialing remote payment gateway');
    throw new Error();
  }
}

module.exports = processPayment;
