import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import "./index.css";
import {
  AppStateProvider,
  globalReducers,
  initialState,
} from "./store/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppStateProvider reducer={globalReducers} initialState={initialState}>
        <App />
      </AppStateProvider>
    </BrowserRouter>
  </StrictMode>
);
