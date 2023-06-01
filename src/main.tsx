import { NextUIProvider } from "@nextui-org/react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
import Posts from "./pages/Posts/Posts.tsx";
import { store } from "./store/store.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <NextUIProvider>
      <Posts />
    </NextUIProvider>
  </Provider>
);
