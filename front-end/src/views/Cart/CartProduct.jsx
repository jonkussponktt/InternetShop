
import { formatPrice } from "../../constants/setPrice";
import { useCurrency } from "../../contexts/CurrencyContext";

export function CartProduct({ name, price, image }) {
  const currency = useCurrency();

  return (
    <div className="cart-product">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <h3>{formatPrice(price, currency)}</h3>
      <p>Cena: {formatPrice(price, currency)}</p>
      <button key="remove">Usuń</button>
    </div>
  );
}