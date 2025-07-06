import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

const port = 5000;
let server: Server;

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://todos_user:44332211@cluster0.xxfexvc.mongodb.net/Books-database_PH-Assignment-3?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to MongoDB using Mongoose!!");
    server = app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();


// / import { MongoClient, ServerApiVersion } from "mongodb";
// import app from "./app";
// // import { client } from "./config/mongodb";
import cors from "cors";

// let server;
// const port = 5000;
// const bootstrap = async () => {
//   // await client.connect();
//   // console.log("Connected to MongoDB");
//   // const db = await client.db("todosDB");
//   // const collection = await db.collection('todos').insertOne({title : 'MongoDB', body: 'MongoDB'});
//   // // console.log("collection", collection);
//   // const fullData = await db.collection('todos').find({}).toArray();
//   // console.log("fullData", fullData);

//   server = app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
//   });
// };
// bootstrap()
