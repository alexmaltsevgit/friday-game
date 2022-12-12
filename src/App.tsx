import { Component } from "solid-js";
import { Routes, Route } from "@solidjs/router";

import { IndexScreen, JoinScreen, RoomScreen } from "@/components/screens";
import { Modal } from "@/components/shared";
import { routes } from "@/service/routes";

import styles from "./App.module.scss";

export const App: Component = () => (
  <>
    <Modal />

    <div class={styles.root}>
      <Routes>
        <Route path={routes.index()} component={IndexScreen} />
        <Route path={routes.join()} component={JoinScreen} />
        <Route path={routes.room()} component={RoomScreen} />
      </Routes>
    </div>
  </>
);
