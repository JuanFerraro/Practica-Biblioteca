const bcrypt = require('bcryptjs');

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hash(password, salt);
  return hash;
};

const matchPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = { encryptPassword, matchPassword };