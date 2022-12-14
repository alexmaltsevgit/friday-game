import { Show } from "solid-js";
import { createStorageSignal } from "@solid-primitives/storage";
import { useNavigate } from "@solidjs/router";

import { Button, Input } from "@/components/shared";
import { useCreateRoom } from "@/service/store";
import { routes } from "@/service/routes";
import { LocalStorageKeys } from "@/service/localStorage";

import decor from "@/assets/index-screen-decor.png";
import styles from "./IndexScreen.module.scss";

export const IndexScreen = () => {
  const navigate = useNavigate();

  const [name, setName] = createStorageSignal<string>(
    LocalStorageKeys.Username
  );

  const mutation = useCreateRoom();
  const onCreateRoom = () => mutation.mutate(name());

  const onWantToJoin = () => navigate(routes.join(""));

  return (
    <div class={styles.root}>
      <div class={styles.content}>
        <div class={styles.main}>
          <h1>Кто я?</h1>

          <div class={styles.form}>
            <Input model={[name, setName]} placeholder={"Ваше имя"} />

            <Show when={mutation.isLoading}>loading...</Show>

            <div class={styles.buttons}>
              <Button onClick={onCreateRoom}>Создать игру</Button>

              <Button onClick={onWantToJoin}>Присоединиться к игре</Button>
            </div>
          </div>
        </div>

        <div class={styles.decor}>
          <img src={decor} alt="" />
        </div>
      </div>
    </div>
  );
};
