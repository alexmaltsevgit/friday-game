import { onCleanup } from "solid-js";

import { useLeaveRoom, useRoomStore } from "@/service/store";
import { RoomStage } from "@/types";
import { AwaitingStage, FillingStage, GuessingStage } from "./components";
import { InGameAuth } from "@/components/features";

import styles from "./RoomScreen.module.scss";

const statusToScreenMap = {
  [RoomStage.Awaiting]: AwaitingStage,
  [RoomStage.Filling]: FillingStage,
  [RoomStage.Guessing]: GuessingStage,
  [RoomStage.Finished]: GuessingStage,
};

export const RoomScreen = () => (
  <InGameAuth>
    <RoomScreenContent />
  </InGameAuth>
);

const RoomScreenContent = () => {
  const roomState = useRoomStore();
  const leaveRoomMutation = useLeaveRoom();

  onCleanup(leaveRoomMutation.mutate);

  return (
    <InGameAuth>
      <div class={styles.root}>
        <div class={styles.content}>
          {statusToScreenMap[roomState.game.stage] ?? <div>Error</div>}
        </div>
      </div>
    </InGameAuth>
  );
};
