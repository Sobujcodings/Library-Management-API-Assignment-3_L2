# 📚 Library Management API

A **RESTful API** for managing a library system using **Express.js**, **TypeScript**, and **MongoDB (Mongoose)**. This API enables users to add, update, delete, borrow books, and retrieve borrowing summaries.

---

## 🌐 Live Server

🔗 **[https://assignment-3-express-mongoose.vercel.app/api/books]**

---

## ⚙️ Tech Stack

- 🚀 **Node.js**
- ⚙️ **Express.js (v5)**
- 🛡️ **TypeScript**
- 🗃️ **MongoDB** with **Mongoose ODM**

---

## 🛠️ Getting Started

### 📦 Installation

```bash
# Initialize project and install dependencies
npm init -y
npm install express mongoose

# Install development dependencies
npm install -D typescript ts-node-dev @types/express

# Initialize TypeScript configuration
npx tsc --init



## 🚀 Features

- Add, update, and list books
- Borrow books with due dates
- Track available copies
- MongoDB aggregation for borrow summaries
- Proper schema validation and error handling
- TypeScript for strong typing


## 🚀 API Details

- POST /api/books
* Create single book with book information given by the user.

- GET /api/books 
* Find all the books with filter,sort and limit option. 

- GET /books/:bookId
* Find single book details by params id.

- DELETE /books/:bookId
* Delete single book by id.

- PUT /books/:bookId 
* Update single book by id and body data given by the user.

- POST /borrow 
* Create a request to borrow book then server check the logic of avalibility from the book collection.

- GET /borrow 
* get summary of all borrowred book by aggeration.