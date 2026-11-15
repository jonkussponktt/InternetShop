import { useCallback, useEffect, useMemo, useState } from "react";
import { FavouritesContext } from "./FavouritesContext";

async function fetchData(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
}

export function FavouritesProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    async function loadFavourites() {
      setStatus("loading");
      setError(null);
      try {
        const favourites = await fetchData("http://localhost:3000/favourites");
        if (!Array.isArray(favourites)) {
          throw new Error("The favourites resource did not return an array");
        }
        const loadedProducts = await Promise.all(
          favourites.map((favourite) =>
            fetchData(
              `http://localhost:3000/products/${favourite.productId}`,
            ),
          ),
        );
        if (active) {
          setProducts(loadedProducts);
          setStatus("ready");
        }
      } catch (loadError) {
        console.error("Error fetching favourite products:", loadError);
        if (active) {
          setError(loadError);
          setStatus("error");
        }
      }
    }
    loadFavourites();
    return () => {
      active = false;
    };
  }, []);

  const addFavourite = useCallback(async (productId) => {
    if (products.some((product) => product.id === productId)) {
      return;
    }
    setError(null);
    try {
      const product = await fetchData(
        `http://localhost:3000/products/${productId}`,
      );
      await fetchData("http://localhost:3000/favourites", {
        method: "POST",
        body: JSON.stringify({ productId }),
        headers: { "Content-Type": "application/json" },
      });
      setProducts((current) =>
        current.some((item) => item.id === product.id)
          ? current
          : [...current, product],
      );
      setStatus("ready");
    } catch (addError) {
      console.error("Error adding favourite product:", addError);
      setError(addError);
      setStatus((currentStatus) =>
        currentStatus === "loading" ? "error" : currentStatus,
      );
    }
  }, [products]);

  const removeFavourite = useCallback(async (productId) => {
    setError(null);
    try {
      const favourites = await fetchData("http://localhost:3000/favourites");
      if (!Array.isArray(favourites)) {
        throw new Error("The favourites resource did not return an array");
      }
      const favourite = favourites.find(
        (item) => item.productId === productId,
      );
      if (!favourite) {
        setProducts((current) =>
          current.filter((product) => product.id !== productId),
        );
        setStatus("ready");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/favourites/${favourite.id}`,
        { method: "DELETE" },
      );
      if (!response.ok) {
        throw new Error(`Failed to delete favourite: ${response.status}`);
      }
      setProducts((current) =>
        current.filter((product) => product.id !== productId),
      );
      setStatus("ready");
    } catch (removeError) {
      console.error("Error removing favourite product:", removeError);
      setError(removeError);
      setStatus((currentStatus) =>
        currentStatus === "loading" ? "error" : currentStatus,
      );
    }
  }, []);

  const value = useMemo(
    () => ({
      products,
      count: products.length,
      status,
      error,
      addFavourite,
      removeFavourite,
    }),
    [products, status, error, addFavourite, removeFavourite],
  );

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
}
