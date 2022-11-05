export enum RoomStatus {
  Awaiting = "awaiting",
  FictionNaming = "fiction-naming",
  Guessing = "guessing",
  Finished = "finished",
}

export enum PlayerStatus {
  Active = "active",
  Opened = "opened",
}

export type Player = {
  id: number;
  realName: string;
  fictionName?: string;
  status: PlayerStatus;
  openedAt?: string;
};

export type Room = {
  id: number;
  status: RoomStatus;
  players: Player;
};
