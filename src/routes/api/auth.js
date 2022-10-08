const express = require("express");
const router = express.Router();

const ctrlWrapper = require("../../heplers/ctrlWrapper");

const {userValidation} = require("../../middlewares/validation");
const authenticate = require("../../middlewares/authentification");
const {subscriptionValidation} = require("../../middlewares/validation");

const {register, login, getCurrent, logout, updateSubscription} = require("../../controllers/user/index")

router.post("/register", userValidation, ctrlWrapper(register));

router.post("/login", userValidation, ctrlWrapper(login));

router.get("/current", authenticate, ctrlWrapper(getCurrent));

router.get("/logout", authenticate, ctrlWrapper(logout));

router.patch("/", authenticate, subscriptionValidation, ctrlWrapper(updateSubscription));
module.exports = router;
