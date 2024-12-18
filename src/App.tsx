import Login from "@/page/auth/Login";
import Register from "@/page/auth/Register";
import Home from "@/page/home/Home";
import { Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import { loginPath } from "@/path/auth.path";
import { transactionPath } from "./path/transaction.path";
import Transaction from "./page/transactions/Transaction";
import FormTransaction from "./page/transactions/Form";
import FormCake from './page/cakes/Form';
import { cakePath } from "./path/cakes.path";
import Cakes from "./page/cakes/Cakes";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={transactionPath.index} element={<Transaction />} />
          <Route path={transactionPath.cashier} element={<FormTransaction />} />

          <Route path={cakePath.index} element={<Cakes />} />
          <Route path={cakePath.form} element={<FormCake />} />
        </Route>
        <Route path={loginPath} element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
