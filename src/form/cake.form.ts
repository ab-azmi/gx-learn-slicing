import { Cake } from "@/types/cake.type";

export const cakeForm: Cake =  {
  name: "",
  profitMargin: 0,
  COGS: 0,
  sellingPrice: 0,
  images: [],
  ingredients: [],
  stock: 0,
};

export const cakeFilter = {
    search: "",
    orderBy: "",
    orderType: "",
}