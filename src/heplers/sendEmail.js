const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const mail = {
    ...data,
    from: "olya.zarichna@ukr.net",
  };
  await sgMail
    .send(mail)
    .then(() => {
      console.log("Email send successful");
    })
    .catch((error) => {
      console.error(error.message);
    });
};

module.exports = sendEmail;
