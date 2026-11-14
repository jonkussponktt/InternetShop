import "./styles/FavouritesList/FavouritesList.css";
import { FavouriteProduct } from "./FavouriteProduct";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import { formatPrice } from "../../constants/setPrice";
import { useCurrency } from "../../contexts/CurrencyContext";

export function FavouritesList({
  products,
  onProductDeleted,
  onExploreProducts,
  status,
}) {
  const currency = useCurrency();

  return (
    <div className="favourites-list">
      <h1>Ulubione</h1>
      {status === "loading" ? (
        <p className="favourites-list-status" role="status">
          Ładowanie ulubionych produktów...
        </p>
      ) : status === "error" ? (
        <p className="favourites-list-status" role="alert">
          Nie udało się załadować ulubionych produktów.
        </p>
      ) : products.length === 0 ? (
        <EmptyState
          title="Nie masz jeszcze ulubionych produktów"
          description="Dodaj produkty do ulubionych, aby szybko do nich wrócić."
          actionLabel="Przeglądaj produkty"
          onAction={onExploreProducts}
        />
      ) : (
        products.map((p) => (
          <FavouriteProduct
            key={p.id}
            id={p.id}
            name={p.productName}
            price={formatPrice(p.pricePLN, currency)}
            image={p.photos?.[0]}
            onProductDeleted={onProductDeleted}
          />
        ))
      )}
    </div>
  );
}
