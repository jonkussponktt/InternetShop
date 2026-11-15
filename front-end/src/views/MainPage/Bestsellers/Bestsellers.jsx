import "./Bestsellers.css";

export function Bestsellers({ children }) {
  return (
    <div className="bestsellers">
      <h2>Sprawdź nasze bestsellery</h2>
      {children}
    </div>
  );
}
