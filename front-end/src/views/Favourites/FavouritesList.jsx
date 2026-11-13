import "./styles/FavouritesList/FavouritesList.css";
import { FavouriteProduct } from "./FavouriteProduct";
import { formatPrice } from "../../constants/setPrice";
import { useCurrency } from "../../contexts/CurrencyContext";

export function FavouritesList({
  products,
  onProductDeleted,
}) {
  const currency = useCurrency();

  if (products.length === 0) {
    return <div>Dodaj produkty do ulubionych aby zobaczyć listę</div>;
  }
return (
    <div className="favourites-list">
      <h1>Ulubione</h1>
      {products.map((p) => (
        <FavouriteProduct
          key={p.id}
          id={p.id}
          name={p.productName}
          price={formatPrice(p.pricePLN, currency)}
          image={p.photos?.[0]}
          onProductDeleted={onProductDeleted}
        />
      ))}
    </div>
  );
}
