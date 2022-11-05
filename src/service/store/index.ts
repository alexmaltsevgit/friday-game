import { Client } from "colyseus.js";
import { createStore } from "solid-js/store";
import { createMutation } from "@tanstack/solid-query";

import {
  GameColyseusState,
  PlainStateFromColyseusState,
  RoomColyseusState,
} from "@/types";
import { mapColyseusStateToPlainState } from "@/utils";

const socket = new Client(import.meta.env.VITE_WS_SERVER_URL_DEV);

const [roomStore, setRoomStore] =
  createStore<PlainStateFromColyseusState<RoomColyseusState> | null>(null);

export const useCreateRoom = () => {
  const mutationFn = async (realName: string) => {
    const room = await socket.create<GameColyseusState>("game", { realName });

    room.onStateChange((s) => {
      // don't move this few lines out of 'onStateChange'
      setRoomStore("roomId", room.id);
      setRoomStore("myId", room.sessionId);

      setRoomStore("game", mapColyseusStateToPlainState(s));
    });

    return room;
  };

  return createMutation(mutationFn);
};

type JoinRoomPayload = {
  realName: string;
  code: string;
};

export const useJoinRoom = () => {
  const mutationFn = async ({ realName, code }: JoinRoomPayload) => {
    const room = await socket.joinById<GameColyseusState>(code, { realName });

    room.onStateChange((s) => {
      // don't move this few lines out of 'onStateChange'
      setRoomStore("roomId", room.id);
      setRoomStore("myId", room.sessionId);

      setRoomStore("game", mapColyseusStateToPlainState(s));
    });

    return room;
  };

  return createMutation(mutationFn);
};

export const useRoomState = () => roomStore;
