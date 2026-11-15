import "./FavouriteProduct.css";
import { useProductActions } from "../../../contexts/ProductActionsContext";
import { useFavourites } from "../../../contexts/FavouritesContext";
import { useCart } from "../../../contexts/CartContext";

export function FavouriteProduct({ id, name, price, image }) {
  const { onProductChosen } = useProductActions();
  const { removeFavourite } = useFavourites();
  const { addToCart } = useCart();

  return (
    <div className="favourite-product">
      <img src={image} alt={name} onClick={() => onProductChosen(id)} />
      <h3 onClick={() => onProductChosen(id)}>{name}</h3>
      <h3>{price}</h3>
      <p>{price}</p>
      <button key="remove" onClick={() => removeFavourite(id)}>Usuń</button>
      <button key="addToCart" onClick={() => addToCart(id)}>Dodaj do koszyka</button>
    </div>
  );
}
