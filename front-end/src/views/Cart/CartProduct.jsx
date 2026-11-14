import { formatPrice } from "../../constants/setPrice";
import { useCurrency } from "../../contexts/CurrencyContext";
import { useProductActions } from "../../contexts/ProductActionsContext";

export function CartProduct({ id, name, price, image }) {
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
      <button key="remove" onClick={() => onRemoveFromCart(id)}>
        Usuń
      </button>
    </div>
  );
}
