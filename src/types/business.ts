import { MapSchema } from "@colyseus/schema";

export enum RoomStatus {
  Awaiting = "awaiting",
  FictionNaming = "fiction-naming",
  Guessing = "guessing",
  Finished = "finished",
}

type Player = {
  realName: string;
  fictionName: string;
};

export type GameColyseusState = {
  ownerId?: string;
  status: RoomStatus;
  players: MapSchema<Player>;
};

export type RoomColyseusState = {
  roomId?: string;
  myId?: string;
  game: GameColyseusState;
};
