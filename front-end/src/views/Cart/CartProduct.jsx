import { formatPrice } from "../../constants/setPrice";
import { useCurrency } from "../../contexts/CurrencyContext";
import { useProductActions } from "../../contexts/ProductActionsContext";

export function CartProduct({ id, name, price, image, quantity }) {
  const currency = useCurrency();
  const { onProductChosen, onRemoveFromCart } = useProductActions();

  return (
    <div className="cart-product">
      <img src={image} alt={name} onClick={() => onProductChosen(id)} />
      <h3 className="productName" onClick={() => onProductChosen(id)}>
        {name}
      </h3>
      <h3 className="price">{formatPrice(price, currency)}</h3>
      <p>Cena: {formatPrice(price, currency)}</p>

      <label>Wybierz ilość</label>
      <select name="quantity" id="quantity">
        <option value="1" selected={quantity === 1}>1</option>
        <option value="2" selected={quantity === 2}>2</option>
        <option value="3" selected={quantity === 3}>3</option>
        <option value="4" selected={quantity === 4}>4</option>
        <option value="5" selected={quantity === 5}>5</option>
      </select>
      <button key="remove" onClick={() => onRemoveFromCart(id)}>
        Usuń
      </button>
    </div>
  );
}
