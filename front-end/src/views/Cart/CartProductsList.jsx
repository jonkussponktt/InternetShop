import { CartProduct } from "./CartProduct";

export function CartProductsList({ products, currency }) {
  return (
    <div className="cart-products-list">
      {products.map((product) => (
        <CartProduct
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          currency={currency}
        />
      ))}
    </div>
  );
}
