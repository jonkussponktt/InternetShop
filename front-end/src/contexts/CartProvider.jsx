import { useCallback, useEffect, useMemo, useState } from "react";
import {
  MAX_ONE_KIND_IN_CART,
  MIN_ONE_KIND_IN_CART,
} from "../config/appConfig";
import { CartContext } from "./CartContext";

function readCartIds() {
  const storedCart = localStorage.getItem("cartProducts");
  if (storedCart === null || storedCart === "") {
    return [];
  }
  const ids = JSON.parse(storedCart);
  if (!Array.isArray(ids)) {
    throw new Error("The stored cart must be an array of product IDs");
  }
  return ids;
}

async function fetchProduct(productId) {
  const response = await fetch(
    `http://localhost:3000/products/${productId}`,
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch product ${productId}: ${response.status}`);
  }
  return response.json();
}

export function CartProvider({ children }) {
  const [initialCart] = useState(() => {
    try {
      return { ids: readCartIds(), error: null };
    } catch (error) {
      console.error("Error reading the stored cart:", error);
      return { ids: [], error };
    }
  });
  const [productIds, setProductIds] = useState(initialCart.ids);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(initialCart.error);

  useEffect(() => {
    let active = true;
    async function loadProducts() {
      if (initialCart.error) {
        setStatus("error");
        return;
      }
      try {
        const uniqueIds = [...new Set(initialCart.ids)];
        const loadedProducts = await Promise.all(
          uniqueIds.map((id) => fetchProduct(id)),
        );
        if (active) {
          const currentIds = readCartIds();
          setProducts((current) => {
            const productsById = new Map(
              [...loadedProducts, ...current].map((product) => [
                product.id,
                product,
              ]),
            );
            return [...new Set(currentIds)]
              .map((id) => productsById.get(id))
              .filter(Boolean);
          });
          setProductIds(currentIds);
          setStatus("ready");
        }
      } catch (loadError) {
        console.error("Error loading cart products:", loadError);
        if (active) {
          setError(loadError);
          setStatus("error");
        }
      }
    }
    loadProducts();
    return () => {
      active = false;
    };
  }, [initialCart]);

  const getQuantity = useCallback(
    (productId) =>
      productIds.filter((currentId) => currentId === productId).length,
    [productIds],
  );

  const addToCart = useCallback(async (productId) => {
    try {
      let currentIds = readCartIds();
      const currentQuantity = currentIds.filter(
        (currentId) => currentId === productId,
      ).length;
      if (currentQuantity >= MAX_ONE_KIND_IN_CART) {
        console.error(
          `Cannot add more than ${MAX_ONE_KIND_IN_CART} products of one type to the cart`,
        );
        return;
      }

      const needsProduct = !currentIds.includes(productId);
      const product = needsProduct ? await fetchProduct(productId) : null;
      currentIds = readCartIds();
      const latestQuantity = currentIds.filter(
        (currentId) => currentId === productId,
      ).length;
      if (latestQuantity >= MAX_ONE_KIND_IN_CART) {
        console.error(
          `Cannot add more than ${MAX_ONE_KIND_IN_CART} products of one type to the cart`,
        );
        return;
      }

      const updatedIds = [...currentIds, productId];
      localStorage.setItem("cartProducts", JSON.stringify(updatedIds));
      setProductIds(updatedIds);
      if (product) {
        setProducts((current) =>
          current.some((item) => item.id === product.id)
            ? current
            : [...current, product],
        );
      }
      setError(null);
      setStatus("ready");
    } catch (addError) {
      console.error("Error adding product to cart:", addError);
      setError(addError);
    }
  }, []);

  const removeFromCart = useCallback((productId, bulk = false) => {
    try {
      const currentIds = readCartIds();
      const currentQuantity = currentIds.filter(
        (currentId) => currentId === productId,
      ).length;
      if (currentQuantity === 0) {
        return;
      }

      let updatedIds;
      if (currentQuantity === MIN_ONE_KIND_IN_CART || bulk) {
        updatedIds = currentIds.filter(
          (currentId) => currentId !== productId,
        );
        setProducts((current) =>
          current.filter((product) => product.id !== productId),
        );
      } else {
        const lastIndex = currentIds.lastIndexOf(productId);
        updatedIds = [...currentIds];
        updatedIds.splice(lastIndex, 1);
      }
      localStorage.setItem("cartProducts", JSON.stringify(updatedIds));
      setProductIds(updatedIds);
      setError(null);
      setStatus("ready");
    } catch (removeError) {
      console.error("Error removing product from cart:", removeError);
      setError(removeError);
    }
  }, []);

  const value = useMemo(
    () => ({
      products,
      itemCount: productIds.length,
      status,
      error,
      getQuantity,
      addToCart,
      removeFromCart,
    }),
    [
      products,
      productIds,
      status,
      error,
      getQuantity,
      addToCart,
      removeFromCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
