const { User } = require("../../models/users");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

require("dotenv").config();

const { SECRET_KEY } = process.env;

const RequestError = require("../../heplers/RequestError");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, "Email not found");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw RequestError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
  await User.findByIdAndUpdate(user._id, {token});
  
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
    status:200
  });
};

module.exports = login;
