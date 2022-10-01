export enum SocketRoomEvent {
  CreateRoom = "room:create",
  ConnectToRoom = "room:connect",
  LeaveRoom = "room:leave",

  ConnectedToRoom = "room:connected",
  JoinedPlayer = "room:player:joined",
  LeftPlayer = "room:player:left",
}

export enum SocketPlayerEvent {
  OpenPlayer = "player:open",

  OpenedPlayer = "player:opened",
  ChangedPlayerFictionName = "player:fictionName:changed",
}
