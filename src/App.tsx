import Login from "@/page/auth/Login";
import Register from "@/page/auth/Register";
import Home from "@/page/home/Home";
import { Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import { loginPath } from "@/path/auth.path";
import Leads from "./page/leads/Leads";
function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="leads" element={<Leads />} />
        </Route>
        <Route path={loginPath} element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
