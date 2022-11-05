import { useParams } from "@solidjs/router";
import { useRoomState } from "@/service/store";

import styles from "./AwaitingScreen.module.scss";
import { For, Show } from "solid-js";
import { Button } from "@/components/shared";

type Params = {
  id: string;
};

export const AwaitingScreen = () => {
  const roomState = useRoomState();
  const players = () => Array.from(roomState.game.players.values());
  const isOwner = () => roomState.myId === roomState.game?.ownerId;

  const { id } = useParams<Params>();

  const title = () =>
    isOwner() ? "Код вашей игры:" : "Подождите, пока игра не начнется";

  return (
    <div class={styles.root}>
      <div class={styles.content}>
        <h2 class={styles.title}>
          <span>{title()}</span>

          <Show when={isOwner()}>
            <span class={styles.code}>{id}</span>
          </Show>
        </h2>

        <div class={styles.players}>
          <h5 class={styles.playersTitle}>{`Игроки (${players().length})`}</h5>

          <ul class={styles.playersList}>
            <For each={players()}>
              {(player) => <li class={styles.player}>{player.realName}</li>}
            </For>
          </ul>
        </div>

        <div class={styles.controls}>
          <Show when={isOwner()}>
            <Button>Перейти к началу игры</Button>
          </Show>

          <Button variant="outlined">Назад</Button>
        </div>
      </div>
    </div>
  );
};
