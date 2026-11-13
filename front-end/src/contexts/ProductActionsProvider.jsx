import { ProductActionsContext } from "./ProductActionsContext";

export function ProductActionsProvider({ actions, children }) {
  return (
    <ProductActionsContext.Provider value={actions}>
      {children}
    </ProductActionsContext.Provider>
  );
}
