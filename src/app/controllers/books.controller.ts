import { SortOrder } from "mongoose";
import { books } from "../models/books.model";
import { Request, Response, Router } from "express";
import express from "express";
import { borrow } from "../models/borrow.model";
import { formatError } from "../utils/error.Response";
import app from "../../app";
import cors from "cors";

export const booksRoutes: Router = express.Router();

// create book by books model
booksRoutes.post("/books", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const noteInserted = await books.create(body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: noteInserted,
    });
  } catch (error: any) {
    res.status(400).json(formatError(error));
  }
});

// get all books
booksRoutes.get("/books", async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      limit = "10",
    } = req.query;

    const filterQuery: any = {};
    if (typeof filter === "string") {
      filterQuery.genre = filter.toUpperCase();
    }
    let sortOrder: SortOrder = sort === "asc" ? 1 : -1;
    const limitValue = parseInt(limit as string, 10);

    const data = await books
      .find(filterQuery)
      .sort({ [sortBy as string]: sortOrder })
      .limit(limitValue);

    res.status(200).json({
      success: data.length ? true : false,
      message: data.length ? "Books retrieved successfully" : "No Books found",
      data: data,
    });
  } catch (error) {
    res.status(500).json(formatError(error));
  }
});

// get single book
booksRoutes.get(
  "/books/:bookId",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { bookId } = req.params;
      const singleData = await books.findById(bookId);

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
    } catch (error) {
      res.status(500).json(formatError(error));
    }
  }
);

// delete a single book
booksRoutes.delete(
  "/books/:bookId",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const bookId = req.params.bookId;
      const singleData = await books.findByIdAndDelete(bookId);

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
    } catch (error) {
      res.status(500).json(formatError(error));
    }
  }
);

// update single note
booksRoutes.put("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const updatedbody = req.body;
    const bookId = req.params.bookId;
    // new updated data
    const singleData = await books.findByIdAndUpdate(bookId, updatedbody, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: singleData ? true : false,
      message: singleData ? "Book updated successfully" : "Book not found",
      data: singleData,
    });
  } catch (error) {
    res.status(500).json(formatError(error));
  }
});

// 6.Borrow a book
booksRoutes.post(
  "/borrow",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const body = req.body;
      console.log(body);

      // Validate request
      if (
        !body.book ||
        body.quantity === undefined ||
        body.dueDate === undefined
      ) {
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
      const book = await books.findById(body.book);
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
      const bookBorrowed = await borrow.create(body);

      res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: bookBorrowed,
      });
    } catch (error) {
      res.status(500).json(formatError(error));
    }
  }
);

// get all borrow books
booksRoutes.get("/borrow", async (req: Request, res: Response) => {
  const data = await borrow.find();
  try {
    const summary = await borrow.aggregate([
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
  } catch (error) {
    res.status(500).json(formatError(error));
  }
});
