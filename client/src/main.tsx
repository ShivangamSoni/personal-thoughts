import { render } from "preact";
import { App } from "./app";
import "./index.css";

import AuthProvider from "./Context/AuthContext";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

render(
  <QueryClientProvider client={new QueryClient()}>
    <AuthProvider>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </AuthProvider>
  </QueryClientProvider>,
  document.getElementById("app") as HTMLElement
);
