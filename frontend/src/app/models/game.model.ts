import Subcategory from "./subcategory.model";

export enum GameStatus {
  FINISHED = "FINISHED",
  PLANNED = "PLANNED",
  STALLED = "STALLED",
  DROPPED = "DROPPED",
  INPROGRESS = "INPROGRES"
}

export interface Game {
  gameId: string;
  entryCreationDate: Date;
  subcategory: Subcategory;
  name: string;
  rating: number;
  status: GameStatus;
  percentage: number;
  platform: string;
}
