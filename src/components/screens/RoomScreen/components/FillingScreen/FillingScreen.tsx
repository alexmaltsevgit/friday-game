import { useNavigate } from "@solidjs/router";
import { Show } from "solid-js";
import { Entries } from "@solid-primitives/keyed";
import debounce from "lodash.debounce";

import { useChangePlayerFictionName, useRoomState } from "@/service/store";
import { Button } from "@/components/shared";
import { routes } from "@/service/routes";
import { model as modelDir } from "@/directives";

import styles from "./FillingScreen.module.scss";

const model = modelDir;

export const FillingScreen = () => {
  const navigate = useNavigate();

  const changePlayerFictionNameMutation = useChangePlayerFictionName();
  const changePlayerFictionName = debounce(
    changePlayerFictionNameMutation.mutate,
    500
  );

  const roomState = useRoomState();

  const isOwner = () => roomState.myId === roomState.game?.ownerId;

  const onGoBack = () => navigate(routes.index());

  return (
    <div class={styles.root}>
      <h2 class={styles.title}>Заполните все поля</h2>

      <ul class={styles.players}>
        <Entries of={roomState.game.players}>
          {(playerId, player) => (
            <Show when={playerId !== roomState.myId}>
              <li class={styles.player}>
                <span class={styles.name}>{player().realName}</span>

                <input
                  use:model={[
                    () => player().fictionName,
                    (newFictionName: string) =>
                      changePlayerFictionName({ playerId, newFictionName }),
                  ]}
                />
              </li>
            </Show>
          )}
        </Entries>
      </ul>

      <div class={styles.controls}>
        <Show when={isOwner()}>
          <Button>Начать игру</Button>
        </Show>

        <Button variant="outlined" onClick={onGoBack}>
          Выйти
        </Button>
      </div>
    </div>
  );
};
