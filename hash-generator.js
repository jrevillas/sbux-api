const stringHash = require('string-hash');

module.exports = order => {
  const {custom, decaf, drink, milk, size, shots, syrup} = order;
  const str = `${custom},${decaf},${drink},${milk},${size},${shots},${syrup}`;
  return stringHash(str);
}
