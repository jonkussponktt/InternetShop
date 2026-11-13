import "./styles/Details/Details.css";
import truck from "../../assets/truck.svg";
import ret from "../../assets/return.svg";
import { Accordion } from "./Accordion";
import { formatPrice } from "../../constants/setPrice";

export function Details({ product, currency }) {
  console.log(`product.price: ${JSON.stringify(product)}`);
  return (
    <div className="details">
      <h2>{product.brand}</h2>
      <p>{product.productName}</p>
      <p>Cena: {formatPrice(product.pricePLN, currency)}</p>
      <button onClick={() => console.log("Dodano do koszyka")}>
        Dodaj do koszyka
      </button>
      <img src={truck} alt="Truck" />
      <p>Dostawa do 24 godzin</p>
      <img src={ret} alt="Return" />
      <p>Zwrot do 30 dni</p>
      <Accordion title="Opis produktu" open={true}>
        {product.description}
      </Accordion>
      <Accordion title="Wskazówki pielęgnacyjne">
        {product.maintenanceInfo}
      </Accordion>
    </div>
  );
}
