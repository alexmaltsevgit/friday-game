import { createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";

import { useRoomStore } from "@/service/store";
import { routes } from "@/service/routes/routes";

export const useSyncRoutes = () => {
  const roomState = useRoomStore();
  const navigate = useNavigate();

  createEffect(() => {
    if (roomState.roomId) navigate(routes.room(roomState.roomId));
    else navigate(routes.index());
  });
};
