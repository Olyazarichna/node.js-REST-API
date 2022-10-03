const { Contact } = require("../models/contact");

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.status(201).json(contacts);
  } catch (error) {
    res.json(error.message);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) { 
     res.json({
        message: "Not found",
        status: 404,
      });
    }
    res.json(contact);
  } catch (error) {
    console.log(error.message);
  }

};

const deleteContact = async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const contact = await Contact.findByIdAndRemove(contactId);
    if (!contact) {
      res.json({
        message: "Not found",
        status: 404,
      });
    }
    res.json(contact);
  } catch (error) {
    console.error(error.message);
  }
};

const addNewContact = async (req, res, next) => {
  try{
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
  }catch(error){
    console.error(error.message);
  }

};
// const changeContact = async (req, res, next) => {
//   try {
//     const result = await updateContact(req.params.contactId, req.body);
//     if (!result) {
//       res.json({
//         message: "Not found",
//         status: 404,
//       });
//     }
//     res.json({ ...result, status: 200 });
//   } catch {
//     res.json({
//       message: "Not found",
//       status: 404,
//     });
//   }
// };

module.exports = {
  getContacts,
  getContactById,
  deleteContact,
  addNewContact,
  // changeContact,
};
