import { For, Show } from "solid-js";

import { useRoomState } from "@/service/store";

import styles from "./ActivePlayersList.module.scss";

export const ActivePlayersList = () => {
  const roomState = useRoomState();
  const players = () => Object.entries(roomState.game.players);

  const activePlayers = () =>
    players().filter(([, player]) => !player.isWinner);

  return (
    <Show when={activePlayers().length > 0}>
      <div class={styles.root}>
        <h5>Игроки</h5>

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
      </div>
    </Show>
  );
};
