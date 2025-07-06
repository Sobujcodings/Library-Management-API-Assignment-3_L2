"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./app/controllers/books.controller");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const allowedOrigins = [
    "http://localhost:5173",
    "https://redux-assignment-4.vercel.app",
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
}));
app.use((0, cors_1.default)());
// Add this line to parse JSON bodies
app.use(express_1.default.json());
// book route
app.use("/api", books_controller_1.booksRoutes);
// root route
app.get("/", (req, res) => {
    res.send("Welcome to Library App");
});
// global error handler
app.use((error, req, res, next) => {
    if (error) {
        res.status(404).json({
            message: `Something went wrong from global error handler, ${error}`,
        });
    }
});
// not found route
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});
exports.default = app;
