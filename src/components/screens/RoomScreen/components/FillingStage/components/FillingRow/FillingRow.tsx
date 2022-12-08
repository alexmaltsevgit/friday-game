import debounce from "lodash.debounce";
import { Match, Switch } from "solid-js";
import clsx from "clsx";

import { Player } from "@/types";
import { useChangePlayerFictionName } from "@/service/store";
import { Input } from "@/components/shared";

import styles from "./FillingRow.module.scss";

type Props = {
  myId: string;
  playerId: string;
  player: Player;
};

export const FillingRow = (p: Props) => {
  const changePlayerFictionNameMutation = useChangePlayerFictionName();
  const changePlayerFictionName = debounce(
    changePlayerFictionNameMutation.mutate,
    500
  );

  return (
    <li class={styles.root}>
      <span class={styles.name}>{p.player.realName}</span>

      <Switch fallback={<></>}>
        <Match when={p.playerId !== p.myId}>
          <Input
            model={[
              () => p.player.fictionName,
              (newFictionName: string) =>
                changePlayerFictionName({
                  playerId: p.playerId,
                  newFictionName,
                }),
            ]}
          />
        </Match>

        <Match when={p.playerId === p.myId}>
          {p.player.fictionName ? (
            <span class={clsx(styles.selfFilledStatus, styles.selfFilled)}>
              Заполнено
            </span>
          ) : (
            <span class={clsx(styles.selfFilledStatus, styles.selfUnfilled)}>
              Пусто
            </span>
          )}
        </Match>
      </Switch>
    </li>
  );
};
