import { Component } from "solid-js";
import clsx from "clsx";

import { ModelValue, model as modelDir } from "@/directives";

import styles from "./Input.module.scss";

const model = modelDir;

type Props = {
  model: ModelValue;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  centered?: boolean;
  fullWidth?: boolean;
  class?: string;
};

export const Input: Component<Props> = (p) => {
  const [text] = p.model;

  return (
    <input
      use:model={p.model}
      class={clsx(styles.root, p.class, {
        [styles.empty]: text()?.trim().length === 0,
        [styles.disabled]: p.disabled,
        [styles.error]: p.error,
        [styles.centered]: p.centered,
        [styles.fullWidth]: p.fullWidth,
      })}
      placeholder={p.placeholder}
      disabled={p.disabled}
    />
  );
};
