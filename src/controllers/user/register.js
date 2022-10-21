const { User } = require("../../models/users");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const RequestError = require("../../heplers/RequestError");
const { v4: uuidv4 } = require("uuid");
const sendEmail = require("../../heplers/sendEmail");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const avatarURL = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = uuidv4();

  const newUser = await User.create({
    email,
    subscription,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  await newUser.save();

  await sendEmail(email);
  const mail = {
    to: email,
    subject: "Please Verify Your Email",
    text: "Please verify your email",
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank"><strong>Please verify email</strong></a>`,
  };
  await sendEmail(mail)
    .then(() => {
      console.log("Email send successful");
    })
    .catch((error) => {
      console.error(error.message);
    });

  res.json({
    status: 201,
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
      verificationToken: newUser.verificationToken,
    },
  });
};

module.exports = register;
