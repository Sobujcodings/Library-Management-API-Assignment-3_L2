# 📚 Library Management Project

This is a **Library Management API with Express, TypeScript & MongoDB** built using **Express.js**, **TypeScript**, and **MongoDB (Mongoose)**. It supports managing books and borrow records, allowing you to create, update, and track book borrowing.

# Server Live-link
**https://assignment-3-express-mongoose.vercel.app/api/books**

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js v5**
- **TypeScript**
- **MongoDB & Mongoose**

---

# Install dependencies
- npm install
- npm init -y
- npm install express mongoose
- npm install -D typescript ts-node-dev @types/express
- npx tsc --init


# package json script to run the server using npm run dev
- "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/app/server.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

# Start the development server locally
npm run dev


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