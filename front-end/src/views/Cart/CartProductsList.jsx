import { CartProduct } from "./CartProduct";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import { useCart } from "../../contexts/CartContext";

export function CartProductsList({ onExploreProducts }) {
  const { products, status, error } = useCart();
  let checkedIds = new Set();

  return (
    <div className="cart-products-list">
      {status === "loading" ? (
        <p role="status">Ładowanie koszyka...</p>
      ) : status === "error" ? (
        <p role="alert">
          Nie udało się załadować koszyka: {error?.message}
        </p>
      ) : (
        <>
          {error && <p role="alert">{error.message}</p>}
          {products.length === 0 ? (
            <EmptyState
              title="Twój koszyk jest pusty"
              description="Dodaj produkty do koszyka, aby zobaczyć je tutaj."
              actionLabel="Przeglądaj produkty"
              onAction={onExploreProducts}
            />
          ) : (
            products.map((product) => {
              if (!checkedIds.has(product.id)) {
                checkedIds.add(product.id);
                return (
                  <CartProduct
                    key={product.id}
                    id={product.id}
                    name={product.productName}
                    price={product.pricePLN}
                    image={product.photos?.[0]}
                  />
                );
              }
              return null;
            })
          )}
        </>
      )}
    </div>
  );
}
