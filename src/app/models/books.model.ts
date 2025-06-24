import { Model, model, Schema } from "mongoose";
import { bookInstanceMethod, Ibooks } from "../interfaces/books.interface";
// interface -> schema -> model -> CRUD using that model

const bookSchema = new Schema<Ibooks, Model<Ibooks>, bookInstanceMethod>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies cannot be negative"],
      validate: {
        validator: Number.isInteger,
        message: "Copies must be an integer",
      },
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

bookSchema.method("checkingBookCopies", async function (copies: number) {
  if (copies === 0) {
    this.available = false;
  }
  await this.save();
  return this.copies;
});

// create model
// now do all the CRUD using this model
export const books = model("books", bookSchema);
