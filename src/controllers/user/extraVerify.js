const { User } = require("../../models/users");

const sendEmail = require("../../heplers/sendEmail");

const extraVerify = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (email && user.verify === true) {
    res.status(404).json({ message: "Verification has already been passed" });
  } else {
    const mail = {
      to: email,
      subject: "Please Verify Your Email",
      text: "Please verify your email",
      html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}" target="_blank"><strong>Please verify email</strong></a>`,
    };
    await sendEmail(mail).then(() => {
        console.log("Email send successful");
      })
      .catch((error) => {
        console.error(error.message);
      });

    res.status(200).json({ message: "Verification email sent" });
  }
};

module.exports = extraVerify;
