import { Show } from "solid-js";
import { useNavigate } from "@solidjs/router";

import { useDeclareMyselfWinner, useRoomStore } from "@/service/store";
import { Button } from "@/components/shared";
import { routes } from "@/service/routes";
import { ActivePlayersList, WinnersList } from "./components";

import styles from "./GuessingStage.module.scss";

export const GuessingStage = () => {
  const navigate = useNavigate();

  const roomState = useRoomStore();
  const me = () => roomState.game.players[roomState.myId];

  const declareMyselfWinnerMutation = useDeclareMyselfWinner();
  const declareMyselfWinner = () => declareMyselfWinnerMutation.mutate();

  const onGoBack = () => navigate(routes.index());

  return (
    <div class={styles.root}>
      <h2>Кто я?</h2>

      <div class={styles.content}>
        <ActivePlayersList />

        <WinnersList />
      </div>

      <div class={styles.controls}>
        <Show when={!me().isWinner}>
          <Button onClick={declareMyselfWinner}>Сообщить о победе</Button>
        </Show>

        <Button variant="outlined" onClick={onGoBack}>
          Выйти
        </Button>
      </div>
    </div>
  );
};
