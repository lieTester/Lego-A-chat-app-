const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// get days method
exports.getExpiry = (days) => {
  return days * 24 * 60 * 60 * 1000;
};

// OTP genarator method
exports.generateOTP = () => {
  return Math.floor(Math.random() * (99999999 - 10000000) + 10000000);
};

// Access token generation method for 2USECASE: 1(while verify useror forgot password),2(login user)
exports.generateToken = (data, key, timeout) => {
  // console.log(data,key,timeout);
  return jwt.sign({ data }, key, {
    expiresIn: timeout,
  });
};
exports.verifyToken = (data, key) => {
  return jwt.verify(data, key);
};

exports.encrypter = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};
exports.decrypter = async (password, hash) => {
  const result = await bcrypt.compare(password, hash);
  // console.log(result);
  return result;
};
