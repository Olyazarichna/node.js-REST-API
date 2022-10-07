const { User } = require("../models/users");
const bcrypt = require("bcryptjs");

const RequestError = require("../heplers/requestError");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw new RequestError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    subscription,
    password: hashPassword,
  });
  res.json({
    status: 201,
    email: newUser.email,
  });
};

module.exports = register;
