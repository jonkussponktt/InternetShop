import "./styles/Product/Product.css";
import heartIcon from "../../assets/heart.svg";

export function Product({
  id,
  name,
  price,
  image,
  onProductChosen,
  onHeartClick,
  isFavourite,
}) {
  return (
    <div className="product">
      <button
        className="addToFavorite"
        onClick={() => {
          onHeartClick(id, name);
        }}
      >
        <img src={heartIcon} className={isFavourite ? "favourite" : ""} />
      </button>
      <img src={image} alt={name} onClick={() => onProductChosen?.(id)} />
      <h3 onClick={() => onProductChosen?.(id)}>{name}</h3>
      <p>{price}</p>
    </div>
  );
}
