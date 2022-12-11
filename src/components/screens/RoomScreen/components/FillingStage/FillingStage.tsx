import { useNavigate } from "@solidjs/router";
import { Show } from "solid-js";
import { Entries } from "@solid-primitives/keyed";

import {
  closeModal,
  openModal,
  useChangeGameStage,
  useRoomStore,
} from "@/service/store";
import { Button } from "@/components/shared";
import { routes } from "@/service/routes";
import { FillingRow } from "./components";
import { RoomStage } from "@/types";
import { Confirmation } from "@/components/entities";

import styles from "./FillingStage.module.scss";

export const FillingStage = () => {
  const navigate = useNavigate();

  const roomState = useRoomStore();

  const isOwner = () => roomState.myId === roomState.game?.ownerId;

  const changeRoomStageMutation = useChangeGameStage();
  const onChangeRoomStage = () =>
    changeRoomStageMutation.mutate(RoomStage.Guessing);

  const isEveryPlayerHasFictionName = () =>
    Object.values(roomState.game.players).every((player) =>
      Boolean(player.fictionName)
    );

  const onExit = () =>
    openModal({
      component: (
        <Confirmation
          confirmationText="Вы не сможете вернуться в игру, если выйдете из нее сейчас. Выйти из игры?"
          onConfirm={() => {
            navigate(routes.index());
            closeModal();
          }}
          onDecline={() => closeModal()}
        />
      ),
    });

  return (
    <div class={styles.root}>
      <h2 class={styles.title}>Заполните все поля</h2>

      <ul class={styles.players}>
        <Entries of={roomState.game.players}>
          {(playerId, player) => (
            <FillingRow
              myId={roomState.myId}
              playerId={playerId}
              player={player()}
            />
          )}
        </Entries>
      </ul>

      <div class={styles.controls}>
        <Show when={isOwner()}>
          <Button
            disabled={!isEveryPlayerHasFictionName()}
            onClick={onChangeRoomStage}
          >
            Начать игру
          </Button>
        </Show>

        <Button variant="outlined" onClick={onExit}>
          Выйти
        </Button>
      </div>
    </div>
  );
};
