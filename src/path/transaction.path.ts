import crudPath from "./config.path";

const transactionPath = {
    ...crudPath('transactions'),
    cashier: '/cashier',
    cashierCake: '/cashier/cake',
};

export default transactionPath;