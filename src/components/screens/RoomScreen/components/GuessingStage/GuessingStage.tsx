import { Show } from "solid-js";
import { useNavigate } from "@solidjs/router";

import {
  closeModal,
  openModal,
  useDeclareMyselfWinner,
  useRoomStore,
} from "@/service/store";
import { Button } from "@/components/shared";
import { routes } from "@/service/routes";
import { ActivePlayersList, WinnersList } from "./components";
import { Confirmation } from "@/components/entities";

import styles from "./GuessingStage.module.scss";

export const GuessingStage = () => {
  const navigate = useNavigate();

  const roomState = useRoomStore();
  const me = () => roomState.game.players[roomState.myId];

  const declareMyselfWinnerMutation = useDeclareMyselfWinner();
  const declareMyselfWinner = () => declareMyselfWinnerMutation.mutate();

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
      <h2>Кто я?</h2>

      <div class={styles.content}>
        <ActivePlayersList />

        <WinnersList />
      </div>

      <div class={styles.controls}>
        <Show when={!me().isWinner}>
          <Button onClick={declareMyselfWinner}>Сообщить о победе</Button>
        </Show>

        <Button variant="outlined" onClick={onExit}>
          Выйти
        </Button>
      </div>
    </div>
  );
};
