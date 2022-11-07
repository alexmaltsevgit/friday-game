import { onCleanup } from "solid-js";

import { useLeaveRoom, useRoomState } from "@/service/store";
import { RoomStage } from "@/types";
import { AwaitingScreen, FillingScreen } from "./components";

const statusToScreenMap = {
  [RoomStage.Awaiting]: AwaitingScreen,
  [RoomStage.Filling]: FillingScreen,
};

export const RoomScreen = () => {
  const roomState = useRoomState();
  const leaveRoomMutation = useLeaveRoom();

  onCleanup(leaveRoomMutation.mutate);

  return <>{statusToScreenMap[roomState.game.stage] ?? <div>Error</div>}</>;
};
