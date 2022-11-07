import { onCleanup } from "solid-js";

import { useLeaveRoom, useRoomState } from "@/service/store";
import { RoomStatus } from "@/types";
import { AwaitingScreen } from "./components";

const statusToScreenMap = {
  [RoomStatus.Awaiting]: AwaitingScreen,
};

export const RoomScreen = () => {
  const roomState = useRoomState();
  const leaveRoomMutation = useLeaveRoom();

  const status = roomState.game.status;

  onCleanup(leaveRoomMutation.mutate);

  return <>{statusToScreenMap[status] ?? <div>Error</div>}</>;
};
