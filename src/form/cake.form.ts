import { Cake } from "@/types/transaction";

export const cakeForm: Cake =  {
  name: "",
  profitMargin: 0,
  cogs: 0,
  sellingPrice: 0,
  images: "",
  ingridients: [],
  stock: 0,
};

export const cakeFilter = {
    search: "",
    orderBy: "",
    orderType: "",
}