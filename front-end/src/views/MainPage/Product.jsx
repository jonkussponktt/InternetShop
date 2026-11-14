import "./styles/Product/Product.css";
import heartIcon from "../../assets/heart.svg";
import filledHeartIcon from "../../assets/heart-filled.svg";
import { useProductActions } from "../../contexts/ProductActionsContext";

export function Product({ id, name, price, image, isFavourite }) {
  const { onProductChosen, onFavouriteAdd } = useProductActions();

  return (
    <div className="product">
      <button
        className="addToFavorite"
        onClick={() => {
          onFavouriteAdd(id, name);
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
