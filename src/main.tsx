import { createRoot } from "react-dom/client";
import App from "@/App.tsx";
import "@/assets/themes/main.scss";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter } from "react-router-dom";
import { DarkModeProvider } from "@/context/DarkModeProvider.tsx";
import { GlobalProvider } from "./context/GlobalContext";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <GlobalProvider>
      <DarkModeProvider>
        <App />
      </DarkModeProvider>
    </GlobalProvider>
  </BrowserRouter>
);
