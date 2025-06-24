// interface -> schema -> model
import { Date, ObjectId, Types } from "mongoose";

export interface Iborrow {
  book: ObjectId;
  quantity : number;
  dueDate : Date,
}

