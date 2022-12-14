import { Client, Room } from "colyseus.js";
import { createStore } from "solid-js/store";
import { createMutation } from "@tanstack/solid-query";
import { batch, createSignal } from "solid-js";

import {
  GameColyseusState,
  PlainStateFromColyseusState,
  RoomColyseusState,
  RoomStage,
  SocketMessage,
} from "@/types";
import { mapColyseusStateToPlainState } from "@/utils";

const socket = new Client(import.meta.env.VITE_WS_SERVER_URL_DEV);

const initialStore: PlainStateFromColyseusState<RoomColyseusState> = {};

const [room, setRoom] = createSignal<Room>();

const [roomStore, setRoomStore] =
  createStore<PlainStateFromColyseusState<RoomColyseusState>>(initialStore);

const clear = () => {
  setRoomStore({
    roomId: undefined,
    game: undefined,
    myId: undefined,
  });
  setRoom(undefined);
};

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
  room.onLeave(clear);
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

export const useChangeGameStage = () => {
  const mutationFn = async (newStage: RoomStage) =>
    room()?.send(SocketMessage.ChangeGameStage, { newStage: newStage });
  return createMutation(mutationFn);
};

type ChangePlayerFictionNamePayload = {
  playerId: string;
  newFictionName: string;
};

export const useChangePlayerFictionName = () => {
  const mutationFn = async ({
    playerId,
    newFictionName,
  }: ChangePlayerFictionNamePayload) =>
    room()?.send(SocketMessage.ChangePlayerFictionName, {
      playerId,
      newFictionName,
    });

  return createMutation(mutationFn, {
    onMutate: ({ playerId, newFictionName }) =>
      setRoomStore("game", "players", playerId, "fictionName", newFictionName),
  });
};

export const useDeclareMyselfWinner = () => {
  const mutationFn = async () =>
    room()?.send(SocketMessage.DeclareMyselfWinner);
  return createMutation(mutationFn);
};

export const useRoomStore = () => roomStore;
