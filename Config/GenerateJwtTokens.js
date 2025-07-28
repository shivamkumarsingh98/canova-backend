const jwt = require("jsonwebtoken");

const generateJwtToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
  return token;
};

module.exports = generateJwtToken;
