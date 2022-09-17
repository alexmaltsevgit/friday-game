import clsx from "clsx";
import { mergeProps, ParentComponent } from "solid-js";

import styles from "./Button.module.scss";

type Props = {
  onClick?: () => void;
  variant?: "filled" | "outlined";
  disabled?: boolean;
};

export const Button: ParentComponent<Props> = (props) => {
  const p = mergeProps({ variant: "filled" } as Props, props);

  return (
    <button
      class={clsx(styles.root, styles[p.variant])}
      classList={{ [styles.disabled]: p.disabled }}
      onClick={() => p.onClick}
      disabled={p.disabled}
    >
      {p.children}
    </button>
  );
};
