import { Express, NextFunction, Application, Request, Response } from "express";
import express from "express";
import { booksRoutes } from "./app/controllers/books.controller";
import cors from "cors";

const app: Application = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://redux-frontend-assignment-4.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  })
);

app.use(cors());

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
    res.status(404).json({
      message: `Something went wrong from global error handler, ${error}`,
    });
  }
});

// not found route
app.use((req, res, next: NextFunction) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
