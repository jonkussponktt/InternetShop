import { CurrencyContext } from "./CurrencyContext";

export function CurrencyProvider({ currency, children }) {
  return (
    <CurrencyContext.Provider value={currency}>
      {children}
    </CurrencyContext.Provider>
  );
}
