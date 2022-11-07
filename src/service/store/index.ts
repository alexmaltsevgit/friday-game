import { Client, Room } from "colyseus.js";
import { createStore } from "solid-js/store";
import { createMutation } from "@tanstack/solid-query";
import { batch, createSignal } from "solid-js";

import {
  GameColyseusState,
  PlainStateFromColyseusState,
  RoomColyseusState,
} from "@/types";
import { mapColyseusStateToPlainState } from "@/utils";

const socket = new Client(import.meta.env.VITE_WS_SERVER_URL_DEV);

const initialStore: PlainStateFromColyseusState<RoomColyseusState> = {};

const [room, setRoom] = createSignal<Room>();

const [roomStore, setRoomStore] =
  createStore<PlainStateFromColyseusState<RoomColyseusState>>(initialStore);

const clearStore = () =>
  setRoomStore({
    roomId: undefined,
    game: undefined,
    myId: undefined,
  });

const createStateChangeListener =
  (room: Room<GameColyseusState>) => (state: GameColyseusState) => {
    batch(() => {
      // you can move this few lines out of state listener, but you should not
      setRoomStore("roomId", room.id);
      setRoomStore("myId", room.sessionId);

      setRoomStore("game", mapColyseusStateToPlainState(state));
    });
  };

const initRoom = (room: Room<GameColyseusState>) => {
  room.onLeave(clearStore);
  room.onStateChange(createStateChangeListener(room));
  setRoom(room);
};

export const useCreateRoom = () => {
  const mutationFn = async (realName: string) => {
    const room = await socket.create<GameColyseusState>("game", { realName });
    initRoom(room);
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
    initRoom(room);
  };

  return createMutation(mutationFn);
};

export const useLeaveRoom = () => {
  const mutationFn = () => room()?.leave();
  return createMutation(mutationFn);
};

export const useRoomState = () => roomStore;
