"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrow = void 0;
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    // reference to another model (to join both model and get book data in the borrow model/table)
    book: {
        type: mongoose_1.Types.ObjectId,
        required: true,
    },
    quantity: {
        // Positive integer representing the number of copies borrowed ?
        type: Number,
        required: true,
        min: [0, "quantity cannot be negative"],
        validate: {
            validator: Number.isInteger,
            message: "quantity must be an integer",
        },
    },
    dueDate: {
        // The date by which the book must be returned ?
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.borrow = (0, mongoose_1.model)("borrow", borrowSchema);
