import { useNavigate } from "@solidjs/router";

import { useDeclareMyselfWinner } from "@/service/store";
import { Button } from "@/components/shared";
import { routes } from "@/service/routes";
import { ActivePlayersList } from "./components";

import styles from "./GuessingStage.module.scss";

export const GuessingStage = () => {
  const navigate = useNavigate();

  const declareMyselfWinnerMutation = useDeclareMyselfWinner();
  const declareMyselfWinner = () => declareMyselfWinnerMutation.mutate();

  const onGoBack = () => navigate(routes.index());

  return (
    <div class={styles.root}>
      <h2>Кто я?</h2>

      <ActivePlayersList />

      <div class={styles.controls}>
        <Button onClick={declareMyselfWinner}>Сообщить о победе</Button>

        <Button variant="outlined" onClick={onGoBack}>
          Выйти
        </Button>
      </div>
    </div>
  );
};
