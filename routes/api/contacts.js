const express = require("express");

const router = express.Router();
// const { contactValidation } = require("../../middlewares/validation");


const {
  // getContacts,
  // getOneContactById,
  // deleteContact,
  addContact,
  // changeContact,
} = require("../../controllers/contacts");

// router.get("/", getContacts);

// router.get("/:contactId", getOneContactById);

router.post("/",()=>addContact);

// router.delete("/:contactId", deleteContact);

// router.put("/:contactId", contactValidation, changeContact);

module.exports = router;
