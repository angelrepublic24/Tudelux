import currency from "currency.js";

export const formatCurrency = (value: number) => {
  return currency(value, {
    symbol: "$",
    precision: 2,
    separator: ",",
  }).format(); // ejemplo: "$1,234.56"
};
