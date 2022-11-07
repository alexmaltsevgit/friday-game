import { useNavigate, useParams } from "@solidjs/router";
import { createSignal } from "solid-js";

import { model as modelDir } from "@/directives";
import { Button } from "@/components/shared";
import { routes } from "@/service/routes";
import { useJoinRoom } from "@/service/store";

import styles from "./JoinScreen.module.scss";

const model = modelDir;

type Params = {
  id?: string;
};

export const JoinScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams<Params>();

  const [name, setName] = createSignal<string>();
  const [code, setCode] = createSignal(id);

  const mutation = useJoinRoom();
  const onJoinRoom = () => mutation.mutate({ realName: name(), code: code() });

  const onBack = () => navigate(routes.index());

  return (
    <div class={styles.root}>
      <div class={styles.content}>
        <h2>Введите свое имя и код игры</h2>

        <div class={styles.form}>
          <div class={styles.inputContainer}>
            <div class={styles.inputLabel}>Ваше имя</div>
            <input use:model={[name, setName]} class={styles.input} />
          </div>

          <div class={styles.inputContainer}>
            <div class={styles.inputLabel}>Код игры</div>
            <input use:model={[code, setCode]} class={styles.input} />
          </div>
        </div>

        <div class={styles.controls}>
          <Button onClick={onJoinRoom}>Присоединиться</Button>

          <Button variant="outlined" onClick={onBack}>
            Назад
          </Button>
        </div>
      </div>
    </div>
  );
};
