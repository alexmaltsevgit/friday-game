import { MapSchema } from "@colyseus/schema";

export enum RoomStage {
  Awaiting = "awaiting",
  Filling = "filling",
  Guessing = "guessing",
  Finished = "finished",
}

type Player = {
  realName: string;
  fictionName: string;
};

export type GameColyseusState = {
  ownerId?: string;
  stage: RoomStage;
  players: MapSchema<Player>;
};

export type RoomColyseusState = {
  roomId?: string;
  myId?: string;
  game?: GameColyseusState;
};
