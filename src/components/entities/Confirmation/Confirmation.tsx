import { Component } from "solid-js";

import { Button } from "@/components/shared";

import styles from "./Confirmation.module.scss";

type Props = {
  confirmationText: string;
  onConfirm?: () => void;
  onDecline?: () => void;
};

export const Confirmation: Component<Props> = (p) => (
  <div class={styles.root}>
    <p class={styles.text}>{p.confirmationText}</p>

    <div class={styles.controls}>
      <Button variant={"filled"} onClick={p.onConfirm}>
        Да
      </Button>

      <Button variant={"outlined"} onClick={p.onDecline}>
        Нет
      </Button>
    </div>
  </div>
);
