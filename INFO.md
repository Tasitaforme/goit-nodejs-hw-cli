👉 [Скріншоти CLI](./README.md)
👉 [ДЗ](./HomeWorkTask.md)
👉 [Корисні матеріали](./INFO.md)

# Корисні матеріали

## Вбудовані модулі

Node.js має набір вбудованих модулів, які можна використовувати без подальшого встановлення.

### [**node:fs**](https://nodejs.org/api/fs.html) — робота з файлами

Ініціалізація модуля FileSystem (що відповідає за роботу з файлами в Node.js.) з промісами:

```js
const fs = require("node:fs/promises");
```

Найбільш використовувані функції для основних операцій над файлами:

- `fs.readFile(filename, [options])` - читання файлу
- `fs.writeFile(filename, data, [options])` - запис файлу
- `fs.appendFile(filename, data, [options])`- додавання у файл
- `fs.rename(oldPath, newPath)` - перейменування файлу.
- `fs.unlink(path, callback)` - видалення файлу.

### [**node:path**](https://nodejs.org/api/path.html) — робота зі шляхами до файлів

Надає утиліти для роботи з шляхами до файлів та каталогів.

```js
const path = require("node:path");
```

На прикладі це виглядає так:

```js
const contactsPath = path.join(__dirname, "contacts.json");

async function readContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
}
async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
  const contacts = await readContacts();
  return contacts;
}

// або відразу:
const listContacts = async () => JSON.parse(await fs.readFile(contactsPath));
```

### [**node:crypto**](https://nodejs.org/api/crypto.html) — генератор унікальних чисел

Надає криптографічну функціональність, яка включає набір оболонок для функцій хешування OpenSSL, HMAC, шифрування, дешифрування, підпису та перевірки.  
[**randomUUID**](https://nodejs.org/api/crypto.html#cryptorandomuuidoptions) — генерує випадковий UUID RFC 4122 версії 4 UUID.

```js
const { randomUUID } = require("node:crypto");

id: randomUUID();
```

## NPM-модулі

### [**nodemon**](https://www.npmjs.com/package/nodemon) — автоматичний перезапуск при змінах

Це інструмент, який допомагає розробляти програми на основі Node.js шляхом автоматичного перезапуску програми node, коли виявляються зміни файлів у каталозі.

```bash
npm install nodemon --save-dev
```

### [**nanoid**](https://www.npmjs.com/package/nanoid) — генератор унікальних ідентифікаторів рядків

```bash
npm i nanoid@3.3.4
```

```js
const { nanoid } = require("nanoid");

id: nanoid(20);
```

## NPM-модулі для зручного парсингу аргументів командного рядка

### [**yargs**](https://www.npmjs.com/package/yargs)

Допомагає створювати інтерактивні інструменти командного рядка, аналізуючи аргументи та створюючи елегантний інтерфейс користувача.

```bash
npm i yargs
```

### [**сommander**](https://www.npmjs.com/package/commander)

Повне рішення для інтерфейсів командного рядка Node.js. Це більш популярна альтернатива модуля yargs.  
Ви пишете код для опису інтерфейсу командного рядка. Commander розбирає аргументи в параметри та командні аргументи, відображає помилки використання для проблем і реалізує довідкову систему.

```bash
npm install commander
```

## Кольорове оформлення консольного виведення

### Використання шаблонів

Шаблон для використання в командних оболонках та мовах програмування є таким: `\x1b[...m`. Це ESCAPE-послідовність, де `\x1b` означає символ ESC (десятковий ASCII код 27), а замість `...` підставляються значення з таблиці, наведеної нижче, причому вони можуть комбінуватися, тоді потрібно їх перерахувати через крапку з комою.

| атрибут |  значення атрибуту  |
| ------- | :-----------------: |
| **0**   |  нормальний режим   |
| **1**   |       жирний        |
| **4**   |    підкреслений     |
| **5**   |      блимаючий      |
| **7**   | інвертовані кольори |
| **8**   |      невидимий      |

| атрибут | колір тексту |
| ------- | :----------: |
| **30**  |    чорний    |
| **31**  |   червоний   |
| **32**  |   зелений    |
| **33**  |    жовтий    |
| **34**  |    синій     |
| **35**  |  пурпурний   |
| **36**  |  блакитний   |
| **37**  |    білий     |

| атрибут | колір фону |
| ------- | :--------: |
| **40**  |   чорний   |
| **41**  |  червоний  |
| **42**  |  зелений   |
| **43**  |   жовтий   |
| **44**  |   синій    |
| **45**  | пурпурний  |
| **46**  | блакитний  |
| **47**  |   білий    |

Записана вкінці послідовність `\x1b[0m` скидає стиль оформлення на стандартний.

Наприклад:

```js
console.log("\x1B[1;30;47m LIST OF ALL CONTACTS: \x1b[0m");
```

### Використання npm-пакету [colors](https://www.npmjs.com/package/colors)

```bash
npm i colors
```

```js
require("colors");
console.log(`LIST OF ALL CONTACTS:`.bgWhite.black);
console.log(`LIST OF ALL CONTACTS:`.green);
console.log(`LIST OF ALL CONTACTS:`.rainbow);
```
