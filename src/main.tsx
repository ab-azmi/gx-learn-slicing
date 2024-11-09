import { createRoot } from "react-dom/client";
import App from "@/App.tsx";
import "@/assets/themes/main.scss";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter } from "react-router-dom";
import { DarkModeProvider } from "@/context/DarkModeProvider.tsx";
import { GlobalProvider } from "./context/GlobalContext";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, Bounce } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <GlobalProvider>
      <DarkModeProvider>
        <App />
        <ToastContainer position="top-right" autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}/>
      </DarkModeProvider>
    </GlobalProvider>
  </BrowserRouter>
);
