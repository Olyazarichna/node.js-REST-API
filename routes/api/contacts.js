const express = require("express");
const Joi = require("joi");

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().min(10).max(30).required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      contacts,
      message: "success",
      status: 200,
    });
  } catch (error) {
    res.json({
      message: "error",
      status: 500,
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const [contact] = await getContactById(contactId);
    if (!contact) {
      res.json({
        message: "Not found",
        status: 404,
      });
    }
    res.json({
      contact: contact,
      message: "Success",
      status: 200,
    });
  } catch (error) {
    res.json({
      message: "Error",
      status: 500,
    });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }
    const newContact = await addContact(req.body);
    res.json({
      contact: newContact,
      message: "Success",
      status: 201,
    });
  } catch (error) {
    res.json({
      message: "Error",
      status: 500,
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);

    if (!contact) {
      res.json({
        message: "Not found",
        status: 404,
      });
    }
    res.json({
      contact,
      message: "Contact deleted",
      status: 200,
    });
  } catch (error) {
    res.json({
      message: "Server error",
      status: 500,
    });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }

    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) {
      res.json({
        message: "Not found",
        status: 404,
      });
    }
    res.json({ result, status: 200 });
  } catch {
    res.json({
      message: "Not found",
      status: 404,
    });
  }
});

module.exports = router;
