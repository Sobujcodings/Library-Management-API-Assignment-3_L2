# 📚 Library Management Project

This is a **Library Management API with Express, TypeScript & MongoDB** built using **Express.js**, **TypeScript**, and **MongoDB (Mongoose)**. It supports managing books and borrow records, allowing you to create, update, and track book borrowing.

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js v5**
- **TypeScript**
- **MongoDB & Mongoose**

---

# Install dependencies
npm install

# Initialize project
npm init -y

# Install core dependencies
npm install express mongoose

# Install TypeScript and dev tools
npm install -D typescript ts-node-dev @types/express

# Setup Typescript
- npx tsc --init

{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true
  }
}

# Update the package json script to run the server using npm run dev
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

- GET /api/books 

- GET /books/:bookId

- DELETE /books/:bookId

- PUT /books/:bookId 

- POST /borrow 

- GET /borrow 