"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const port = 5000;
let server;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect("mongodb+srv://todos_user:44332211@cluster0.xxfexvc.mongodb.net/Books-database_PH-Assignment-3?retryWrites=true&w=majority&appName=Cluster0");
            console.log("Connected to MongoDB using Mongoose!!");
            server = app_1.default.listen(port, () => {
                console.log(`App is listening on port ${port}`);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
main();
// / import { MongoClient, ServerApiVersion } from "mongodb";
// import app from "./app";
// // import { client } from "./config/mongodb";
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
