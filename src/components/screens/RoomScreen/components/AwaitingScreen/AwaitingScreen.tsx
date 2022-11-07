import { useNavigate, useParams } from "@solidjs/router";
import { For, Show } from "solid-js";

import { useChangeGameStage, useRoomState } from "@/service/store";
import { Button } from "@/components/shared";
import { routes } from "@/service/routes";
import { RoomStage } from "@/types";

import styles from "./AwaitingScreen.module.scss";

type Params = {
  id: string;
};

export const AwaitingScreen = () => {
  const { id } = useParams<Params>();
  const navigate = useNavigate();

  const roomState = useRoomState();
  const players = () => Object.values(roomState.game.players);
  const isOwner = () => roomState.myId === roomState.game?.ownerId;

  const changeRoomStageMutation = useChangeGameStage();
  const onChangeRoomStage = () =>
    changeRoomStageMutation.mutate(RoomStage.Filling);

  const onGoBack = () => navigate(routes.index());

  const title = () =>
    isOwner() ? "Код вашей игры:" : "Подождите, пока игра не начнется";

  return (
    <div class={styles.root}>
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
          <Button onClick={onChangeRoomStage}>Перейти к началу игры</Button>
        </Show>

        <Button variant="outlined" onClick={onGoBack}>
          Назад
        </Button>
      </div>
    </div>
  );
};
