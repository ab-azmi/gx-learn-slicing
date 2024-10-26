import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import { loginPath } from "../path/auth.path";
function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path={loginPath} element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
