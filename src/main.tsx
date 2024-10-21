import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./page/App.tsx";
import "./assets/themes/main.scss";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
