import { useNavigate, useParams } from "@solidjs/router";
import { createSignal } from "solid-js";

import { model as modelDir } from "@/directives";
import { Button } from "@/components/shared";
import { routes } from "@/service/routes";

import styles from "./JoinScreen.module.scss";

const model = modelDir;

type Params = {
  id?: string;
};

export const JoinScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams<Params>();

  const [code, setCode] = createSignal(id);

  const onBack = () => navigate(routes.index());

  return (
    <div class={styles.root}>
      <div class={styles.content}>
        <h2>Введите код игры</h2>

        <input use:model={[code, setCode]} class={styles.input} />

        <div class={styles.controls}>
          <Button>Присоединиться</Button>

          <Button variant="outlined" onClick={onBack}>
            Назад
          </Button>
        </div>
      </div>
    </div>
  );
};
