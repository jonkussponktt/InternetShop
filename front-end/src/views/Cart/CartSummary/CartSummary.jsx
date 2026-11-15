import truck from "../../../assets/truck.svg";
import "./CartSummary.css";
import { formatPrice } from "../../../constants/setPrice";
import { useCurrency } from "../../../contexts/CurrencyContext";
import { useCart } from "../../../contexts/CartContext";

export function CartSummary() {
  const currency = useCurrency();
  const { products } = useCart();

  const totalPrice = products.reduce(
    (total, product) => total + product.pricePLN,
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
        <img src={truck} />
        <span>Darmowa dostawa od {formatPrice(500, currency)}</span>
      </span>
    </div>
  );
}
