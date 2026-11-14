import { CartProduct } from "./CartProduct";

export function CartProductsList({ products }) {
  return (
    <div className="cart-products-list">
      {products.map((product) => (
        <CartProduct
          key={product.id}
          id={product.id}
          name={product.productName}
          price={product.pricePLN}
          image={product.photos?.[0]}
        />
      ))}
    </div>
  );
}
