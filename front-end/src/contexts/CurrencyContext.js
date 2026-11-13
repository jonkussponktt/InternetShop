import { createContext, useContext } from "react";

export const CurrencyContext = createContext(undefined);

export function useCurrency() {
  const currency = useContext(CurrencyContext);
  if (currency === undefined) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return currency;
}
