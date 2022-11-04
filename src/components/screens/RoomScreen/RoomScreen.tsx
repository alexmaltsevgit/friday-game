import { useRoomState } from "@/service/store";

export const RoomScreen = () => {
  const roomState = useRoomState();
  const isOwner = () => roomState.myId === roomState.game?.ownerId;

  return <div>RoomScreen</div>;
};
