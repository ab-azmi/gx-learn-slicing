import Login from "@/page/auth/Login";
import Register from "@/page/auth/Register";
import Home from "@/page/home/Home";
import { Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import { loginPath } from "@/path/auth.path";
import transactionPath from "./path/transaction.path";
import Transaction from "./page/transactions/Transaction";
import TransactionForm from "./page/transactions/TransactionForm";
import CakeForm from './page/cakes/CakeForm';
import cakePath from "./path/cakes.path";
import Cakes from "./page/cakes/Cakes";
import CakeMenu from "./page/transactions/components/CakeMenu";
import CakeDetail from "./page/transactions/components/CakeDetail";
import settingPath from "./path/setting.path";import Setting from "./page/setting/Setting";
import FixedCost from "./page/setting/FixedCost";
import fixedCostPath from "./path/fixedCost.path";
import ingredientPath from "./path/ingredient.path";
import Ingredient from "./page/cakes/Ingredient";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={transactionPath.index} element={<Transaction />} />

          <Route path={transactionPath.cashier} element={<TransactionForm />}>
            <Route index element={<CakeMenu />} />
            <Route path={`${transactionPath.cashierCake}/:id`} element={<CakeDetail />} />
          </Route>

          <Route path={cakePath.index} element={<Cakes />} />
          <Route path={cakePath.form} element={<CakeForm />} />

          <Route path={ingredientPath.index} element={<Ingredient />} />

          <Route path={settingPath.index} element={<Setting/>} />

          <Route path={fixedCostPath.index} element={<FixedCost/>} />
        </Route>
        <Route path={loginPath} element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
