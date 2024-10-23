import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import darkModeStore from "../store/DarkModeStore";
import { useEffect } from "react";

function App() {
  const { darkMode } = darkModeStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", darkMode);
  }, [darkMode]);
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
