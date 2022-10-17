const { User } = require("../../models/users");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const RequestError = require("../../heplers/RequestError");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, "Email in use" );
  }
const avatarURL = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    subscription,
    password: hashPassword,
    avatarURL,
  });
  res.json({
    status: 201,
    user: {email: newUser.email,
      subscription :newUser.subscription,
      avatarURL: newUser.avatarURL,
    }
    
  });
};

module.exports = register;
