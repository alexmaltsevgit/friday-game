import { createSignal } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";
import { createStorageSignal } from "@solid-primitives/storage";

import { Button, Input } from "@/components/shared";
import { routes } from "@/service/routes";
import { useJoinRoom } from "@/service/store";
import { LocalStorageKeys } from "@/service/localStorage";

import styles from "./JoinScreen.module.scss";

type Params = {
  id?: string;
};

export const JoinScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams<Params>();

  const [name, setName] = createStorageSignal<string>(
    LocalStorageKeys.Username
  );

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
            <Input
              model={[name, setName]}
              class={styles.input}
              placeholder={"Имя"}
            />
          </div>

          <div class={styles.inputContainer}>
            <div class={styles.inputLabel}>Код игры</div>
            <Input
              model={[code, setCode]}
              class={styles.input}
              placeholder={"0000"}
            />
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
