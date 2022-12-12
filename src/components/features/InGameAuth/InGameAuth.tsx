import { useNavigate } from "@solidjs/router";
import { Component, createEffect, JSX, Show } from "solid-js";

import { routes } from "@/service/routes";
import { useRoomStore } from "@/service/store";

type Props = {
  children: JSX.Element;
};

/**
 * Protect the nested components: allow to access them only if user is in game now.
 * Otherwise, redirect to index route
 */
export const InGameAuth: Component<Props> = (p) => {
  const roomState = useRoomStore();
  const navigate = useNavigate();

  const isInGame = () => Boolean(roomState.roomId);

  createEffect(() => {
    if (!isInGame()) navigate(routes.index());
  });

  return <Show when={isInGame()}>{p.children}</Show>;
};
