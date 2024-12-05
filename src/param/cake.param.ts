import { Cake, CakeFilter, CakeRestock } from "@/types/cake.type";

export const cakeForm: Cake =  {
  name: "",
  profitMargin: 0,
  COGS: 0,
  sellingPrice: 0,
  images: [],
  ingredients: [],
  stockSell: 0,
  stockNonSell: 0,
  isSell: false,
  totalDiscount: 0,
};

export const cakeFilter: CakeFilter = {
    search: "",
    searchIn: "",
    orderBy: "",
    orderType: "",
    fromCOGS: "",
    toCOGS: "",
    fromSellingPrice: "",
    toSellingPrice: "",
    fromStockSell: "",
    toStockSell: "",
    fromStockNonSell: "",
    toStockNonSell: "",
    archived: "",
}

export const cakeRestockParam: CakeRestock = {
  addStockNonSell: 0,
  addStockSell: 0,
}