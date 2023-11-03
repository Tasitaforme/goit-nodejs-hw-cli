const fs = require("node:fs/promises");
const path = require("node:path");
const { nanoid } = require("nanoid");
const { randomUUID } = require("node:crypto");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function readContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
}

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

// Повертає масив контактів.
async function listContacts() {
  const contacts = await readContacts();
  return contacts;
}

// Повертає об'єкт контакту з таким id.
// Повертає null, якщо контакт з таким id не знайдений.
async function getContactById(contactId) {
  const contacts = await readContacts();
  const contact = contacts.find((el) => el.id === contactId);
  return contact || null;
}

// Повертає об'єкт видаленого контакту.
// Повертає null, якщо контакт з таким id не знайдений.
async function removeContact(contactId) {
  if (!contactId) {
    return "Unable to delete contact, please enter contact ID if you want to delete it!";
  }
  const contacts = await readContacts();
  const index = contacts.findIndex((el) => el.id === contactId);
  if (index === -1) {
    console.log(
      "You are trying to delete a contact with ID that does not exist!"
    );
    return null;
  }
  // first solution
  const [deletedContact] = contacts.splice(index, 1);
  await writeContacts(contacts);
  return deletedContact;

  //or another solution
  // const contactsWithoutDeletedContact = [
  //   ...contacts.slice(0, index),
  //   ...contacts.slice(index + 1),
  // ];
  // await writeContacts(contactsWithoutDeletedContact);
  // return contacts[index];
}

// Повертає об'єкт доданого контакту.
// first solution
async function addContact({ name = "", email = "", phone = "" }) {
  if (name || email || phone) {
    const contacts = await readContacts();
    const newContact = {
      id: randomUUID(),
      name,
      email,
      phone,
    };
    // first solution
    contacts.push(newContact);
    await writeContacts(contacts);
    return newContact;
    // or another solution
    //const newContacts = [...contacts, newContact];
    //await writeContacts(newContacts);
    //return newContact;
  }
  return "Cannot add a contact, enter name, email, or number...";
}

// second solution (без деструктуризації та дефолтних значень, з використанням nanoid)
// async function addContact(inputContact) {
//   const contacts = await readContacts();
//   const newContact = {
//     id: nanoid(20),
//     ...inputContact,
//   };
//   contacts.push(newContact);
//   await writeContacts(contacts);
//   return newContact;
// }

// Повертає об'єкт оновленого контакту
async function updateContact(id, inputData) {
  if (!id) {
    return "Сannot update the contact, enter the contact ID if you want to update it!";
  }
  if ((id && !inputData) || inputData == {}) {
    return "Сannot update the contact, enter info that you want to update!";
  }
  const contacts = await readContacts();
  const index = contacts.findIndex((el) => el.id === id);
  if (index === -1) {
    console.log(
      "You are trying to update a contact with ID that does not exist!"
    );
    return null;
  }
  //first solution (якщо враховувати, що не всі поля заповнені)
  const prevContact = contacts[index];
  contacts[index] = {
    ...prevContact,
    name: inputData.name || prevContact.name,
    email: inputData.email || prevContact.email,
    phone: inputData.phone || prevContact.phone,
  };
  const updatedContact = contacts[index];
  await writeContacts(contacts);
  return updatedContact;
  //second solution (якщо враховувати, що всі поля заповнені)
  // const prevContact = contacts[index];
  // contacts[index] = { ...prevContact, ...inputData };
  // const updatedContact = contacts[index];
  // await writeContacts(contacts);
  // return updatedContact;

  //third solution (якщо враховувати, що всі поля заповнені)
  // const updatedContact = { id, ...inputData };
  // const updatedContacts = [
  //   ...contacts.slice(0, index),
  //   updatedContact,
  //   ...contacts.slice(index + 1),
  // ];
  // await writeContacts(updatedContacts);
  // return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
