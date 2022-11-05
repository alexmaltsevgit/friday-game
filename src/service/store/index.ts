import { Client } from "colyseus.js";
import { createStore } from "solid-js/store";
import { createMutation } from "@tanstack/solid-query";
import { MapSchema } from "@colyseus/schema";

const socket = new Client(import.meta.env.VITE_WS_SERVER_URL_DEV);

type Player = {
  realName: string;
  fictionName: string;
};

type GameState = {
  ownerId?: string;
  players: MapSchema<Player>;
};

type RoomState = {
  roomId?: string;
  myId?: string;
  game?: GameState;
};

const [roomStore, setRoomStore] = createStore<RoomState | null>(null);

export const useCreateRoom = () => {
  const mutationFn = async (realName: string) => {
    const room = await socket.create<GameState>("game", { realName });

    room.onStateChange((s) => {
      // don't move this few lines out of 'onStateChange'
      setRoomStore("roomId", room.id);
      setRoomStore("myId", room.sessionId);

      setRoomStore("game", s);
    });

    return room;
  };

  return createMutation(mutationFn);
};

export const useRoomState = () => roomStore;
