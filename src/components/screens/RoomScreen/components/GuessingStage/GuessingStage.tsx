import { useNavigate } from "@solidjs/router";
import { For, Show } from "solid-js";

import { useDeclareMyselfWinner, useRoomState } from "@/service/store";
import { Button } from "@/components/shared";
import { routes } from "@/service/routes";

import styles from "./GuessingStage.module.scss";

export const GuessingStage = () => {
  const navigate = useNavigate();

  const roomState = useRoomState();
  const players = () => Object.entries(roomState.game.players);

  const activePlayers = () => players().filter(([, player]) => !player.guessed);

  const declareMyselfWinnerMutation = useDeclareMyselfWinner();
  const declareMyselfWinner = () => declareMyselfWinnerMutation.mutate();

  const onGoBack = () => navigate(routes.index());

  return (
    <div class={styles.root}>
      <h2>Кто я?</h2>

      <ul class={styles.playersList}>
        <For each={activePlayers()}>
          {([playerId, player]) => (
            <li class={styles.player}>
              <span>{player.realName}</span>

              <Show when={playerId !== roomState.myId}>
                <span class={styles.accentColor}>{player.fictionName}</span>
              </Show>
            </li>
          )}
        </For>
      </ul>

      <div class={styles.controls}>
        <Button onClick={declareMyselfWinner}>Сообщить о победе</Button>

        <Button variant="outlined" onClick={onGoBack}>
          Выйти
        </Button>
      </div>
    </div>
  );
};
