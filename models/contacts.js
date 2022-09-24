const fs = require("fs/promises");

const path = require("path");
const { v4: uuidv4 } = require("uuid");
uuidv4();

const contactsPath = path.join(__dirname, "../models/contacts.json");

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    const contactList = JSON.parse(contacts);
    return contactList;
  } catch (error) {
    return error.message;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactById = contacts.filter((contact) => contact.id === contactId);
    if (!contactById) {
      return null;
    }

    return contactById;
  } catch (error) {
    return error.message;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const deleteContact = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (deleteContact === -1) {
      return null;
    }
    const [result] = contacts.splice(deleteContact, 1);
    await updateContacts(contacts);
    console.log(result);
    return result;
  } catch (error) {
    return error.message;
  }
};

const addContact = async (body) => {
  try {
    const newContact = {
      id: uuidv4(),
      ...body,
    };
    const contacts = await listContacts();
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
  } catch (error) {
    return error.message;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contactList = await listContacts();
    const index = contactList.findIndex((item) => item.id === contactId);
    if (index === -1) {
      return null;
    }
    contactList[index] = { id: uuidv4(), ...body };
    await updateContacts(contactList);
    return contactList[index];
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
