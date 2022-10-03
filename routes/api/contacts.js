const express = require("express");

const router = express.Router();

const { contactValidation } = require("../../middlewares/validation");


const {
  getContacts,
  getContactById,
  deleteContact,
  addNewContact,
  // changeContact,
} = require("../../controllers/contactsController");

router.get("/", getContacts);

router.get("/:contactId", getContactById);

router.post("/", contactValidation, addNewContact);

router.delete("/:contactId", deleteContact);

// router.put("/:contactId", contactValidation, changeContact);

// router.patch("/:contactId")
module.exports = router;
