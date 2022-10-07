const express = require("express");
const ctrlWrapper = require("../../heplers/ctrlWrapper");
const register = require("../../controllers/registerController")
const login = require("../../controllers/loginController");
const router = express.Router();
const { userValidation} = require("../../middlewares/validation");

router.post("/register", userValidation, ctrlWrapper(register));

router.post("/login", userValidation, ctrlWrapper(login));

module.exports = router;
