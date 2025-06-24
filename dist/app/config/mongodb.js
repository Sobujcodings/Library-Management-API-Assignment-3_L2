"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const mongodb_1 = require("mongodb");
const uri = "mongodb+srv://todos_user:44332211@cluster0.xxfexvc.mongodb.net/todosDB?retryWrites=true&w=majority&appName=Cluster0";
// ai client k import kore akhn shob jaygay kaj korbo get/post/delete/update
exports.client = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
