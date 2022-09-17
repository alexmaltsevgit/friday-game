/* @refresh reload */
import { render } from "solid-js/web";
import { App } from "./App";

import "./styles/reset.css";
import "./styles/vars.scss";

render(() => <App />, document.getElementById("root") as HTMLElement);
