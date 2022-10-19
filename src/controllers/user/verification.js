const { User } = require("../../models/users");
const RequestError = require("../../heplers/RequestError");

const verification = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw RequestError(404, "Not found verification token");
  }
  await User.findOneAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
  res.json({
    message: "Verification successful",
  });
};

module.exports = verification;
