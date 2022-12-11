import { Component } from "solid-js";
import { Routes, Route } from "@solidjs/router";

import { IndexScreen, JoinScreen, RoomScreen } from "@/components/screens";
import { Modal } from "@/components/shared";
import { routes, useSyncRoutes } from "@/service/routes";

import styles from "./App.module.scss";

export const App: Component = () => {
  useSyncRoutes();

  return (
    <>
      <Modal />

      <div class={styles.root}>
        <div class={styles.content}>
          <Routes>
            <Route path={routes.index()} component={IndexScreen} />
            <Route path={routes.room()} component={RoomScreen} />
            <Route path={routes.join()} component={JoinScreen} />
          </Routes>
        </div>
      </div>
    </>
  );
};
