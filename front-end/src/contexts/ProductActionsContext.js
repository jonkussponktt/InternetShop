import { createContext, useContext } from "react";

export const ProductActionsContext = createContext(undefined);

export function useProductActions() {
  const actions = useContext(ProductActionsContext);
  if (actions === undefined) {
    throw new Error("useProductActions must be used within ProductActionsProvider");
  }
  return actions;
}
