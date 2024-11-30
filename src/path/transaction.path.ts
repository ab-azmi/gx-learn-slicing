import { crudPath } from "./config.path";

export const transactionPath = {
    ...crudPath('transactions'),
    cashier: '/cashier',
};