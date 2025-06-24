import { Express, NextFunction, Application, Request, Response } from "express";
import express from "express";
import mongoose, { model, Schema } from "mongoose";
import { booksRoutes } from "./app/controllers/books.controller";

const app: Application = express();
// Add this line to parse JSON bodies
app.use(express.json());

// book route
app.use("/api", booksRoutes);

// root route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Library App");
});

// global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res
      .status(404)
      .json({
        message: `Something went wrong from global error handler, ${error}`,
      });
  }
});

// not found route
app.use((req, res, next: NextFunction) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
