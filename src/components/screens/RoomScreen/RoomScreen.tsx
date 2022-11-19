import { onCleanup } from "solid-js";

import { useLeaveRoom, useRoomState } from "@/service/store";
import { RoomStage } from "@/types";
import { AwaitingStage, FillingStage, GuessingStage } from "./components";

import styles from "./RoomScreen.module.scss";

const statusToScreenMap = {
  [RoomStage.Awaiting]: AwaitingStage,
  [RoomStage.Filling]: FillingStage,
  [RoomStage.Guessing]: GuessingStage,
  [RoomStage.Finished]: GuessingStage,
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
