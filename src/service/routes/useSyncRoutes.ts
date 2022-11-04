import { createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";

import { useRoomState } from "@/service/store";
import { routes } from "@/service/routes/routes";

export const useSyncRoutes = () => {
  const roomState = useRoomState();
  const navigate = useNavigate();

  createEffect(() => {
    if (roomState.roomId) navigate(routes.room(roomState.roomId));
    else navigate(routes.index());
  });
};
