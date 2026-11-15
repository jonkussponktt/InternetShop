import { createContext, useContext } from "react";

export const FavouritesContext = createContext(undefined);

export function useFavourites() {
  const favourites = useContext(FavouritesContext);
  if (favourites === undefined) {
    throw new Error("useFavourites must be used within FavouritesProvider");
  }
  return favourites;
}
