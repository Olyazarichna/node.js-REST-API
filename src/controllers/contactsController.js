const { Contact } = require("../../src/models/contact");
const RequestError = require("../heplers/requestError");

const getContacts = async (req, res, next) => {
  const contacts = await Contact.find({});
  res.status(201).json(contacts);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw RequestError(404, "Not found");
  }

  res.json({ contact, status: "Success" });
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId);

  if (!contact) {
    if (!contact) {
      throw RequestError(404, "Not found");
    }
  }
  return res.json({
    contact,
    message: "Contact deleted",
    status: 200,
  });
};

const addNewContact = async (req, res, next) => {
  const contact = await Contact.create(req.body);
  res.json({
    contact,
    message: "Contact added",
    status: 201,
  });
};

const changeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, {
    $set: req.body,
  });
  if (!contact) {
    return res.json({
      message: "Not found",
      status: 404,
    });
  }
  res.json({
    message: "Contact update",
    status: 201,
  });
};

const updateFavorite =async(req, res, next)=>{
const {contactId} = req.params;
const {favorite} =req.body;
const updateContact = await Contact.findByIdAndUpdate(contactId, {favorite});
if(!updateContact){
  return res.json({
    message:  "missing field favorite",
    status: 404
  })
}
  res.json({
    message: "Field favorite update",
    status:200
  })
}

module.exports = {
  getContacts,
  getContactById,
  deleteContact,
  addNewContact,
  changeContact,
  updateFavorite
};
