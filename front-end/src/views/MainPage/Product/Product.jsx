import "./Product.css";
import heartIcon from "../../../assets/heart.svg";
import filledHeartIcon from "../../../assets/heart-filled.svg";
import { useProductActions } from "../../../contexts/ProductActionsContext";
import { useFavourites } from "../../../contexts/FavouritesContext";

export function Product({ id, name, price, image }) {
  const { onProductChosen } = useProductActions();
  const { products, addFavourite, removeFavourite } = useFavourites();
  const isFavourite = products.some((product) => product.id === id);

  return (
    <div className="product">
      <button
        className="addToFavorite"
        onClick={() => {
          if (isFavourite) {
            removeFavourite(id);
          } else {
            addFavourite(id);
          }
        }}
      >
        <img src={isFavourite ? filledHeartIcon : heartIcon} alt="" />
      </button>
      <img src={image} alt={name} onClick={() => onProductChosen?.(id)} />
      <h3 onClick={() => onProductChosen?.(id)}>{name}</h3>
      <p>{price}</p>
    </div>
  );
}
