const getCurrent = require("./getCurrent");
const login = require("./login");
const logout = require("./logout");
const register = require("./register");
const updateSubscription = require("./updateSubscription")
const updateAvatar = require("./updateAvatar");
const verification = require("./verification");
const extraVerify = require("./extraVerify");

module.exports = {
  getCurrent,
  login,
  logout,
  register,
  updateSubscription,
  updateAvatar,
  verification,
  extraVerify
};
