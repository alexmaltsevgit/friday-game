import { useRoomState } from "@/service/store";
import { RoomStatus } from "@/types";
import { AwaitingScreen } from "./components";

const statusToScreenMap = {
  [RoomStatus.Awaiting]: AwaitingScreen,
};

export const RoomScreen = () => {
  const roomState = useRoomState();
  const status = roomState.game.status;

  return <>{statusToScreenMap[status] ?? <div>Error</div>}</>;
};
