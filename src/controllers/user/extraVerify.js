const { User } = require("../../models/users");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const extraVerify = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (email && user.verify === true) {
    res.status(404).json({ message: "Verification has already been passed" });
  } else {
    const mail = {
      to: email,
      from: "olya.zarichna@ukr.net",
      subject: "Please Verify Your Email",
      text: "Let's verify your email",
      html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}" target="_blank"><strong>Let's verify ${email}</strong></a>`,
    };
    await sgMail
      .send(mail)
      .then(() => {
        console.log("Email send successful");
      })
      .catch((error) => {
        console.error(error.message);
      });

    res.status(200).json({ message: "Verification email sent" });
  }
};

module.exports = extraVerify;
