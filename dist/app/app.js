"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express')
const express_1 = __importDefault(require("express"));
const todos_routes_1 = __importDefault(require("../app/todos/todos.routes"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 5000;
app.use(express_1.default.json());
const filePath = path_1.default.join(__dirname, "../../db/todo.json");
// const todosRouter = express.Router();
const usersRouter = express_1.default.Router();
// if route matched then go to this route(specefic route/file for specific url)
// first e /todos pele then ai route e jabe bakita url oikhane ache porer gula
app.use("/todos", todos_routes_1.default);
app.use("/users", usersRouter);
// if no url found send this 404 
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});
// if any valid error found modify the hmtl error according to user choice => (global error handler)
app.use((error, req, res, next) => {
    if (error) {
        console.log("error", error);
        res.status(400).json({ message: "Something went wrong from global error handler", error });
    }
});
exports.default = app;
