import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { Router } from "@solidjs/router";
import { render } from "solid-js/web";

import { App } from "./App";

import "./styles/reset.scss";
import "./styles/vars.scss";
import "./styles/default.scss";

const queryClient = new QueryClient();

render(
  () => (
    <QueryClientProvider client={queryClient}>
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  ),
  document.getElementById("root") as HTMLElement
);
