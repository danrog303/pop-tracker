import Subcategory from "./subcategory.model";

export enum MovieStatus {
  FINISHED = "FINISHED",
  PLANNED = "PLANNED",
  STALLED = "STALLED",
  DROPPED = "DROPPED",
  INPROGRESS = "INPROGRES"
}

export interface Movie {
  movieId: string;
  subcategory: Subcategory;
  entryCreationDate: Date;
  name: string;
  rating: number;
  status: MovieStatus;
  director: string;
}
