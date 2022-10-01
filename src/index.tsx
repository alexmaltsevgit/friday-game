import { Router } from "@solidjs/router";
import { render } from "solid-js/web";

import { App } from "./App";

import "./styles/reset.scss";
import "./styles/vars.scss";
import "./styles/default.scss";

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById("root") as HTMLElement
);
