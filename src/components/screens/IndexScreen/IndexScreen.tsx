import { Button } from "@/components/shared";

import decor from "@/assets/index-screen-decor.png";
import styles from "./IndexScreen.module.scss";

export const IndexScreen = () => {
  return (
    <div class={styles.root}>
      <div class={styles.content}>
        <div class={styles.main}>
          <h1>Кто я?</h1>

          <div class={styles.form}>
            <input type="text" />

            <div class={styles.buttons}>
              <Button>Создать игру</Button>

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
