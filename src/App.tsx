import Home from "@/page/home/Home";
import Login from "@/page/auth/Login";
import Cakes from "./page/cakes/Cakes";
import cakePath from "./path/cakes.path";
import Layout from "@/components/Layout";
import Register from "@/page/auth/Register";
import Discount from "./page/cakes/Discount";
import { loginPath } from "@/path/auth.path";
import CakeForm from './page/cakes/CakeForm';
import Setting from "./page/setting/Setting";
import settingPath from "./path/setting.path";
import discountPath from "./path/discount.path";
import Ingredient from "./page/cakes/Ingredient";
import { Route, Routes } from "react-router-dom";
import FixedCost from "./page/setting/FixedCost";
import fixedCostPath from "./path/fixedCost.path";
import ingredientPath from "./path/ingredient.path";
import transactionPath from "./path/transaction.path";
import Transaction from "./page/transactions/Transaction";
import CakeMenu from "./page/transactions/components/CakeMenu";
import TransactionForm from "./page/transactions/TransactionForm";
import CakeDetail from "./page/transactions/components/CakeDetail";

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

          <Route path={discountPath.index} element={<Discount />} />

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
