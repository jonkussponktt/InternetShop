import "./CurrencySelector.css";
import { useCurrency } from "../../contexts/CurrencyContext";

export function CurrencySelector({ onCurrencySelect }) {
  const currency = useCurrency();

  return (
    <div className="currency-selector">
      <select
        value={currency}
        onChange={(e) => {
          onCurrencySelect(e.target.value);
        }}
      >
        <option value="PLN">PLN</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>
    </div>
  );
}
