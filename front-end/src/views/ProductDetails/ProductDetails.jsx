import "./styles/ProductDetails/ProductDetails.css";
import { Photos } from "./Photos";
import { Details } from "./Details";

export function ProductDetails({ product }) {
  return (
    <div className="product-details">
      <Photos photos={product.photos} />
      <Details product={product} />
    </div>
  );
}
