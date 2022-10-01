import { createSignal } from "solid-js";

import { Button } from "@/components/shared";
import { model as modelDir } from "@/directives";
import { socket } from "@/socket";
import { SocketRoomEvent } from "@/types";

import decor from "@/assets/index-screen-decor.png";
import styles from "./IndexScreen.module.scss";

const model = modelDir;

export const IndexScreen = () => {
  const [name, setName] = createSignal();

  const createRoom = () => socket.emit(SocketRoomEvent.CreateRoom);

  return (
    <div class={styles.root}>
      <div class={styles.content}>
        <div class={styles.main}>
          <h1>Кто я?</h1>

          <div class={styles.form}>
            <input use:model={[name, setName]} />

            <div class={styles.buttons}>
              <Button onClick={createRoom}>Создать игру</Button>

              <Button>Присоединиться к игре</Button>
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
