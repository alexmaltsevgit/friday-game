import { For, Show } from "solid-js";

import { useRoomState } from "@/service/store";

import styles from "./WinnersList.module.scss";

export const WinnersList = () => {
  const roomState = useRoomState();
  const players = () => Object.values(roomState.game.players);

  const winners = () => players().filter((player) => player.isWinner);

  return (
    <Show when={winners().length > 0}>
      <div class={styles.root}>
        <h5 class={styles.title}>Победители</h5>

        <ul class={styles.winnersList}>
          <For each={winners()}>
            {(player) => (
              <li class={styles.winner}>
                <span class={styles.winnerNumber}>{player.winnerNumber}</span>

                <span class={styles.winnerRealName}>{player.realName}</span>
              </li>
            )}
          </For>
        </ul>
      </div>
    </Show>
  );
};
