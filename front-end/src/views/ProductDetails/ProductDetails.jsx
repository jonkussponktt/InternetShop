import "./styles/ProductDetails/ProductDetails.css";
import { Photos } from "./Photos";
import { Details } from "./Details";

export function ProductDetails({ product }) {
  console.log(`product: ${JSON.stringify(product)}`);
  console.log(`product.photos: ${JSON.stringify(product.photos)}`);
  return (
    <div className="product-details">
      <Photos photos={product.photos} />
      <Details product={product} />
    </div>
  );
}
