const jwt = require("jsonwebtoken");
const generateToken = async function (id) {
  const token = await jwt.sign({ id }, process.env.JWT_SECRET);
  return token;
};

module.exports = generateToken;
