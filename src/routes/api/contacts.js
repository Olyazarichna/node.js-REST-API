const express = require("express");
const ctrlWrapper = require("../../heplers/ctrlWrapper");
const router = express.Router();
// const {isValidId,
// authenticate,
// } = require("../../middlewares")
const isValidId = require("../../middlewares/isValidId");
const {
  contactValidation,
  favoriteValidation,
} = require("../../../src/middlewares/validation.js");

const authenticate = require("../../middlewares/authentification");
const {
  getContacts,
  getContactById,
  addNewContact,
  deleteContact,
  changeContact,
  updateFavorite,
} = require("../../controllers/contacts/contactsController");

router.get("/", authenticate, ctrlWrapper(getContacts));

router.get("/:contactId", authenticate, isValidId, ctrlWrapper(getContactById));

router.post("/", authenticate, contactValidation, ctrlWrapper(addNewContact));

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(deleteContact)
);

router.put(
  "/:contactId",
  authenticate,
  contactValidation,
  isValidId,
  ctrlWrapper(changeContact)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  favoriteValidation,
  updateFavorite
);
module.exports = router;
