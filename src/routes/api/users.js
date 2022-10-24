const express = require("express");
const router = express.Router();

const ctrlWrapper = require("../../heplers/ctrlWrapper");

const authenticate = require("../../middlewares/authentification");
const { userValidation } = require("../../middlewares/validation");
const { subscriptionValidation } = require("../../middlewares/validation");
const { verifyEmail } = require("../../middlewares/validation.js");
const upload = require("../../middlewares/upload");
const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
  verification,
  extraVerify,
} = require("../../controllers/user/index");

router.post("/register", userValidation, ctrlWrapper(register));

router.post("/login", userValidation, ctrlWrapper(login));

router.get("/current", authenticate , ctrlWrapper(getCurrent));

router.get("/logout", authenticate , ctrlWrapper(logout));

router.patch(
  "/",
  authenticate,
  subscriptionValidation,
  ctrlWrapper(updateSubscription)
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(updateAvatar)
);

router.get("/verify/:verificationToken", ctrlWrapper(verification));

router.post("/verify", verifyEmail, ctrlWrapper(extraVerify));
module.exports = router;
