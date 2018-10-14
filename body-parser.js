module.exports = body => {
  try {
    return JSON.parse(body);
  } catch (err) {
    return undefined;
  }
};
