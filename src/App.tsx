import { Component } from "solid-js";
import { Routes, Route } from "@solidjs/router";

import { IndexScreen, RoomScreen } from "@/components/screens";
import { routes, useSyncRoutes } from "@/service/routes";

export const App: Component = () => {
  useSyncRoutes();

  return (
    <Routes>
      <Route path={routes.index()} component={IndexScreen} />
      <Route path={routes.room()} component={RoomScreen} />
    </Routes>
  );
};
