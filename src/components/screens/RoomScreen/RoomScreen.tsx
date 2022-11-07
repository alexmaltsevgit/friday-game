import { onCleanup } from "solid-js";

import { useLeaveRoom, useRoomState } from "@/service/store";
import { RoomStage } from "@/types";
import { AwaitingScreen, FillingScreen } from "./components";

import styles from "./RoomScreen.module.scss";

const statusToScreenMap = {
  [RoomStage.Awaiting]: AwaitingScreen,
  [RoomStage.Filling]: FillingScreen,
};

export const RoomScreen = () => {
  const roomState = useRoomState();
  const leaveRoomMutation = useLeaveRoom();

  onCleanup(leaveRoomMutation.mutate);

  return (
    <div class={styles.root}>
      <div class={styles.content}>
        {statusToScreenMap[roomState.game.stage] ?? <div>Error</div>}
      </div>
    </div>
  );
};
