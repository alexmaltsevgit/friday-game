import { useNavigate } from "@solidjs/router";
import { Show } from "solid-js";
import { Entries } from "@solid-primitives/keyed";

import { useRoomState } from "@/service/store";
import { Button } from "@/components/shared";
import { routes } from "@/service/routes";
import { FillingRow } from "./components";

import styles from "./FillingScreen.module.scss";

export const FillingScreen = () => {
  const navigate = useNavigate();

  const roomState = useRoomState();

  const isOwner = () => roomState.myId === roomState.game?.ownerId;

  const onGoBack = () => navigate(routes.index());

  const isEveryPlayerHasFictionName = () =>
    Object.values(roomState.game.players).every((player) =>
      Boolean(player.fictionName)
    );

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
          <Button disabled={!isEveryPlayerHasFictionName()}>Начать игру</Button>
        </Show>

        <Button variant="outlined" onClick={onGoBack}>
          Выйти
        </Button>
      </div>
    </div>
  );
};
