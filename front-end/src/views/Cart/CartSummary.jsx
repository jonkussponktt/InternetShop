import truck from "../../assets/truck.svg";
import "./styles/CartSummary/CartSummary.css";
import { formatPrice } from "../../constants/setPrice";
import { useCurrency } from "../../contexts/CurrencyContext";

export function CartSummary({ products }) {
  const currency = useCurrency();

  const totalPrice = products.reduce(
    (total, product) => total + product.price,
    0,
  );
  const deliveryCost = totalPrice > 500 ? 0 : 49;
  return (
    <div className="cart-summary">
      <h2>Podsumowanie</h2>
      <span>
        Wartość produktów<p>{formatPrice(totalPrice, currency)}</p>
      </span>
      <span>
        Koszt dostawy<p>{formatPrice(deliveryCost, currency)}</p>
      </span>
      <p>
        <span>Do zapłaty:</span>
        <strong>{formatPrice(totalPrice + deliveryCost, currency)}</strong>
      </p>
      <button key="toCashRegister">DO KASY</button>
      <span>
        <img src={truck} /> <span>Darmowa dostawa od 500 zł</span>
      </span>
    </div>
  );
}
