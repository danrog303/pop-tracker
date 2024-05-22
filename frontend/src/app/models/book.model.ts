import Subcategory from "./subcategory.model";

export enum BookStatus {
  FINISHED = "FINISHED",
  PLANNED = "PLANNED",
  STALLED = "STALLED",
  DROPPED = "DROPPED",
  INPROGRESS = "INPROGRES"
}

export interface Book {
  bookId: string;
  entryCreationDate: Date;
  subcategory: Subcategory;
  name: string;
  author: string;
  rating: number;
  status: BookStatus;
  pagesNumber: number;
}
