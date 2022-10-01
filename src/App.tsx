import { Component } from "solid-js";
import { Routes, Route } from "@solidjs/router";

import { IndexScreen } from "@/components/screens";

export const App: Component = () => (
  <Routes>
    <Route path={"/"} component={IndexScreen} />
  </Routes>
);
