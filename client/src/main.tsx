import { render } from "preact";
import { App } from "./app";
import "./index.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

render(
  <QueryClientProvider client={new QueryClient()}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
  document.getElementById("app") as HTMLElement
);
