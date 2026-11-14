import { CartProduct } from "./CartProduct";
import { EmptyState } from "../../components/EmptyState/EmptyState";

export function CartProductsList({ products, onExploreProducts }) {
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
        products.map((product) => (
          <CartProduct
            key={product.id}
            id={product.id}
            name={product.productName}
            price={product.pricePLN}
            image={product.photos?.[0]}
          />
        ))
      )}
    </div>
  );
}
