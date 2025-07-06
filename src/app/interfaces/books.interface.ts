import { Types } from "mongoose";
// interface -> schema -> model

export interface Ibooks {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

// create interface for instance method
export interface bookInstanceMethod {
  checkingBookCopies(copies: number): number;
}
