import "./styles/FavouriteProduct/FavouriteProduct.css";
import { useProductActions } from "../../contexts/ProductActionsContext";

export function FavouriteProduct({ id, name, price, image, onProductDeleted }) {
  const { onProductChosen } = useProductActions();

  return (
    <div className="favourite-product">
      <img src={image} alt={name} onClick={() => onProductChosen(id)} />
      <h3 onClick={() => onProductChosen(id)}>{name}</h3>
      <h3>{price}</h3>
      <p>{price}</p>
      <button key="remove" onClick={() => onProductDeleted(id)}>Usuń</button>
      <button key="addToCart">Dodaj do koszyka</button>
    </div>
  );
}
