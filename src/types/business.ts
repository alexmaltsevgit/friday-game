import { MapSchema } from "@colyseus/schema";

export enum RoomStage {
  Awaiting = "awaiting",
  Filling = "filling",
  Guessing = "guessing",
  Finished = "finished",
}

export type Player = {
  realName: string;
  fictionName: string;
  isWinner: boolean;
  winnerNumber: number;
};

export type GameColyseusState = {
  ownerId?: string;
  stage: RoomStage;
  players: MapSchema<Player>;
  winnersCount: number;
};

export type RoomColyseusState = {
  roomId?: string;
  myId?: string;
  game?: GameColyseusState;
};
