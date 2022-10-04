const express = require("express");
const ctrlWrapper = require("../../heplers/ctrlWrapper");
const router = express.Router();
const isValidId = require("../../middlewares/isValidId");
const {
  contactValidation,
  favoriteValidation,
} = require("../../../src/middlewares/validation.js");

const {
  getContacts,
  getContactById,
  deleteContact,
  addNewContact,
  changeContact,
  updateFavorite,
} = require("../../../src/controllers/contactsController");

router.get("/",  ctrlWrapper(getContacts));

router.get("/:contactId", isValidId, ctrlWrapper(getContactById));

router.post("/", contactValidation, ctrlWrapper(addNewContact));

router.delete("/:contactId", isValidId, ctrlWrapper(deleteContact));

router.put("/:contactId", contactValidation, isValidId, ctrlWrapper(changeContact));
router.patch(
  "/:contactId/favorite",
  isValidId,
  favoriteValidation,
  updateFavorite
);
module.exports = router;
