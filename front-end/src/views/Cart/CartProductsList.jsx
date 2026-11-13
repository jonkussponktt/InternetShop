import { CartProduct } from "./CartProduct";

export function CartProductsList({ products }) {
  return (
    <div className="cart-products-list">
      {products.map((product) => (
        <CartProduct
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
        />
      ))}
    </div>
  );
}
