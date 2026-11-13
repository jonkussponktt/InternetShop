import "./CurrencySelector.css";

export function CurrencySelector({ currency, onCurrencySelect }) {
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
