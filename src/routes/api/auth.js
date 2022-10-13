const express = require("express");
const router = express.Router();

const ctrlWrapper = require("../../heplers/ctrlWrapper");

const {userValidation} = require("../../middlewares/validation");
const authenticate = require("../../middlewares/authentification");
const {subscriptionValidation} = require("../../middlewares/validation");
const upload = require("../../middlewares/upload");
const {register, login, getCurrent, logout, updateSubscription, updateAvatar} = require("../../controllers/user/index")

router.post("/register", userValidation, ctrlWrapper(register));

router.post("/login", userValidation, ctrlWrapper(login));

router.get("/current", authenticate, ctrlWrapper(getCurrent));

router.get("/logout", authenticate, ctrlWrapper(logout));

router.patch("/", authenticate, subscriptionValidation, ctrlWrapper(updateSubscription));

router.patch("/avatars", authenticate, upload.single("avatar"), ctrlWrapper(updateAvatar))
module.exports = router;
