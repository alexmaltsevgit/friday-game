/* @refresh reload */
import { render } from "solid-js/web";
import { App } from "./App";

import "./styles/reset.scss";
import "./styles/vars.scss";
import "./styles/default.scss";

render(() => <App />, document.getElementById("root") as HTMLElement);
