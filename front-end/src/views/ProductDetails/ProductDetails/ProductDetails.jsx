import "./ProductDetails.css";
import { Photos } from "../Photos/Photos";
import { Details } from "../Details/Details";

export function ProductDetails({ product }) {
  return (
    <div className="product-details">
      <Photos photos={product.photos} />
      <Details product={product} />
    </div>
  );
}
