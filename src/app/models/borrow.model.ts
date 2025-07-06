import { Schema, ObjectId, model, Types } from "mongoose";
import { Iborrow } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<Iborrow>(
  {
    // reference to another model (to join both model and get book data in the borrow model/table)
    book: {
      type: Types.ObjectId,
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const borrow = model("borrow", borrowSchema);
