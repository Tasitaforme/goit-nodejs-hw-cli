const contacts = require("./contacts");
require("colors");
const yargsArgv = require("yargs").argv;
const { program } = require("commander");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.log(`LIST OF ALL CONTACTS:`.rainbow);
      console.log("\x1B[1;37;46m");
      console.table(allContacts);
      console.log("\x1b[0m");
      break;

    case "get":
      const oneContact = await contacts.getContactById(id);
      if (!oneContact)
        console.log(
          "\x1b[37;41m YOU ARE LOOKING FOR NOT EXISTING CONTACT: \x1b[0m"
        );
      else console.log("\x1B[1;30;47m YOU ARE LOOKING FOR CONTACT: \x1b[0m");
      console.table(oneContact);
      break;

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      console.log("\x1B[1;30;47m YOU HAVE CREATED A NEW CONTACT: \x1b[0m");
      console.table(newContact);
      break;

    case "remove":
      const deleteContact = await contacts.removeContact(id);
      if (!deleteContact)
        console.log(
          "\x1b[37;41m YOU ARE TRYING TO DELETE A CONTACT THAT DOES NOT EXIST:  \x1b[0m"
        );
      else console.log("\x1B[1;30;47m YOU HAVE DELETED A CONTACT: \x1b[0m");
      console.table(deleteContact);
      break;

    case "update":
      const updatedContact = await contacts.updateContact(id, {
        name,
        email,
        phone,
      });
      if (!updatedContact)
        console.log(
          "\x1b[37;41m YOU ARE TRYING TO UPDATED A CONTACT THAT DOES NOT EXIST:  \x1b[0m"
        );
      else console.log("\x1B[1;30;47m YOU HAVE UPDATED A CONTACT: \x1b[0m");
      console.table(updatedContact);
      break;

    default:
      console.warn("\x1b[30;41m UNKNOWN ACTION TYPE! \x1b[0m");
  }
}

//? з використанням yargs для парсингу аргументів командного рядка
// invokeAction(yargsArgv);

//? з використанням commander для парсингу аргументів командного рядка
program
  .option("-a, --action <action>", "Action to invoke")
  .option("-i, --id <id>", "Contact id")
  .option("-n, --name <name>", "Contact name")
  .option("-e, --email <email>", "Contact email")
  .option("-p, --phone <phone>", "Contact phone");

program.parse(process.argv);
const options = program.opts();
invokeAction(options);

//? Перевірка працездатності функцій для роботи з контактами
// (async () => {
//   const s = await contacts.listContacts();
//   const s = await contacts.getContactById((id = "Z5sbDlS7pCzNsnAHLtDJd"));
//   const s = await contacts.removeContact((id = "AeHIrLTr6JkxGE6SN-0Rw"));
//   const s = await contacts.addContact({
//     name: "Allen Raymond",
//     email: "nulla.ante@vestibul.co.uk",
//     phone: "(992) 914-3792",
//   });
//   console.log(s);
// })();
