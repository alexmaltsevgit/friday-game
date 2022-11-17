import { useNavigate } from "@solidjs/router";
import { For } from "solid-js";

import { useRoomState } from "@/service/store";
import { Button } from "@/components/shared";
import { routes } from "@/service/routes";

import styles from "./GuessingStage.module.scss";

export const GuessingStage = () => {
  const navigate = useNavigate();

  const roomState = useRoomState();
  const players = () => Object.values(roomState.game.players);

  const activePlayers = () => players().filter((player) => !player.guessed);

  const onGoBack = () => navigate(routes.index());

  return (
    <div class={styles.root}>
      <h2>Кто я?</h2>

      <ul class={styles.playersList}>
        <For each={activePlayers()}>
          {(player) => (
            <li class={styles.player}>
              <span>{player.realName}</span>
              <span class={styles.accentColor}>{player.fictionName}</span>
            </li>
          )}
        </For>
      </ul>

      <div class={styles.controls}>
        <Button>Сообщить о победе</Button>

        <Button variant="outlined" onClick={onGoBack}>
          Выйти
        </Button>
      </div>
    </div>
  );
};
