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
exports.booksRoutes = void 0;
const books_model_1 = require("../models/books.model");
const express_1 = __importDefault(require("express"));
const borrow_model_1 = require("../models/borrow.model");
const error_Response_1 = require("../utils/error.Response");
exports.booksRoutes = express_1.default.Router();
// create book by books model
exports.booksRoutes.post("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const noteInserted = yield books_model_1.books.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: noteInserted,
        });
    }
    catch (error) {
        res.status(400).json((0, error_Response_1.formatError)(error));
    }
}));
// get all books
exports.booksRoutes.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = "createdAt", sort = "desc", limit = "10", } = req.query;
        const filterQuery = {};
        if (typeof filter === "string") {
            filterQuery.genre = filter.toUpperCase();
        }
        let sortOrder = sort === "asc" ? 1 : -1;
        const limitValue = parseInt(limit, 10);
        const data = yield books_model_1.books
            .find(filterQuery)
            .sort({ [sortBy]: sortOrder })
            .limit(limitValue);
        res.status(200).json({
            success: data.length ? true : false,
            message: data.length ? "Books retrieved successfully" : "No Books found",
            data: data,
        });
    }
    catch (error) {
        res.status(500).json((0, error_Response_1.formatError)(error));
    }
}));
// get single book
exports.booksRoutes.get("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const singleData = yield books_model_1.books.findById(bookId);
        if (!singleData) {
            res.status(200).json({
                success: false,
                message: "Book not found",
                data: [],
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: singleData,
        });
    }
    catch (error) {
        res.status(500).json((0, error_Response_1.formatError)(error));
    }
}));
// delete a single book
exports.booksRoutes.delete("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const singleData = yield books_model_1.books.findByIdAndDelete(bookId);
        if (!singleData) {
            res.status(200).json({
                success: false,
                message: "No book found",
                data: null,
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        res.status(500).json((0, error_Response_1.formatError)(error));
    }
}));
// update single note
exports.booksRoutes.put("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedbody = req.body;
        const bookId = req.params.bookId;
        // new updated data
        const singleData = yield books_model_1.books.findByIdAndUpdate(bookId, updatedbody, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            success: singleData ? true : false,
            message: singleData ? "Book updated successfully" : "Book not found",
            data: singleData,
        });
    }
    catch (error) {
        res.status(500).json((0, error_Response_1.formatError)(error));
    }
}));
// 6.Borrow a book
exports.booksRoutes.post("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        console.log(body);
        // Validate request
        if (!body.book ||
            body.quantity === undefined ||
            body.dueDate === undefined) {
            res.status(400).json({
                success: false,
                message: "bookId, quantity, and dueDate are required",
            });
            return;
        }
        if (body.quantity <= 0 || !Number.isInteger(body.quantity)) {
            res.status(400).json({
                success: false,
                message: "Quantity must be a positive integer",
            });
            return;
        }
        // Step 1: Find the book
        const book = yield books_model_1.books.findById(body.book);
        if (!book) {
            res.status(404).json({
                success: false,
                message: "Book not found",
            });
            return;
        }
        // Step 2: Check copies
        if (book.copies < body.quantity) {
            res.status(400).json({
                success: false,
                message: "Not enough copies available",
            });
            return;
        }
        // Step 3: Deduct copies
        book.copies -= body.quantity;
        // Call instance method
        book.checkingBookCopies(book.copies);
        // Save borrowed book
        const bookBorrowed = yield borrow_model_1.borrow.create(body);
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: bookBorrowed,
        });
    }
    catch (error) {
        res.status(500).json((0, error_Response_1.formatError)(error));
    }
}));
// get all borrow books
exports.booksRoutes.get("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield borrow_model_1.borrow.find();
    try {
        const summary = yield borrow_model_1.borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "book",
                },
            },
            {
                $unwind: "$book",
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$book.title",
                        isbn: "$book.isbn",
                    },
                    totalQuantity: 1,
                },
            },
        ]);
        const formatted = summary.map((item) => ({
            book: item.book,
            totalQuantity: item.totalQuantity,
        }));
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: formatted,
        });
    }
    catch (error) {
        res.status(500).json((0, error_Response_1.formatError)(error));
    }
}));
