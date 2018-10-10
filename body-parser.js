module.exports = body => {
  try {
    const parsed = JSON.parse(body);
    return typeof(parsed) === 'object' && parsed !== null ? parsed : undefined;
  } catch (err) {
    return undefined;
  }
};
