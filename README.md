
# 📚 Library Management API

A **RESTful API** for managing a library system using **Express.js**, **TypeScript**, and **MongoDB (Mongoose)**. This API enables users to add, update, delete, borrow books, and retrieve borrowing summaries.

---

## 🌐 Live Server

🔗 **[API Endpoint – https://assignment-3-express-mongoose.vercel.app/api/books](https://assignment-3-express-mongoose.vercel.app/api/books)**

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
```

### 🔧 Scripts

Update your `package.json`:

```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/app/server.ts",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

### 🚀 Run the development server

```bash
npm run dev
```

---

## 📌 Features

- 📗 Add, update, and delete books
- 📚 Borrow books and track due dates
- 🔁 Track book availability
- 📊 MongoDB aggregation for borrow summaries
- ✅ Schema validation and error handling
- 🧠 Strong typing with TypeScript

---

## 📘 API Endpoints

### 📕 Books

- `POST /api/books`  
  ➤ Create a new book with user-provided information.

- `GET /api/books`  
  ➤ Retrieve all books with filter, sort, and limit options.

- `GET /api/books/:bookId`  
  ➤ Fetch a single book by its ID.

- `PUT /api/books/:bookId`  
  ➤ Update a book by its ID using request body data.

- `DELETE /api/books/:bookId`  
  ➤ Delete a book by its ID.

---

### 📗 Borrow

- `POST /api/borrow`  
  ➤ Borrow a book. The server checks book availability before processing.

- `GET /api/borrow`  
  ➤ Retrieve a summary of all borrowed books using MongoDB aggregation.

---

## 📂 Project Structure (Example)

```
src/
├── app/
│   ├── server.ts
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── utils/
├── config/
└── ...
```

---

## 📜 License

This project is for educational purposes and part of a learning assignment. You're free to use and improve it!
