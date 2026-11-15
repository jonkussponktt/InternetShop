import "./FullWidthButton.css";

export function FullWidthButton({ onClick }) {
  return (
    <button className="full-width-button" onClick={onClick}>
      Sprawdź produkty
    </button>
  );
}
