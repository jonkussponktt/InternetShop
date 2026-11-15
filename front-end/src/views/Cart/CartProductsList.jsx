import { CartProduct } from "./CartProduct";
import { EmptyState } from "../../components/EmptyState/EmptyState";

export function CartProductsList({ products, onExploreProducts }) {
  let checkedIds = new Set();

  return (
    <div className="cart-products-list">
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
            const cartProduct = (
              <CartProduct
                key={product.id}
                id={product.id}
                name={product.productName}
                price={product.pricePLN}
                image={product.photos?.[0]}
              />
            );
            checkedIds.add(product.id);
            return cartProduct;
          }
        })
      )}
    </div>
  );
}
