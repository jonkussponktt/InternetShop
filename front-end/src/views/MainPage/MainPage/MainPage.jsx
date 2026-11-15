import "./MainPage.css";
import { Hero } from "../Hero/Hero";
import { CenteredContent } from "../CenteredContent/CenteredContent";
import { FullWidthButton } from "../FullWidthButton/FullWidthButton";
import { Bestsellers } from "../Bestsellers/Bestsellers";
import { Product } from "../Product/Product";
import { EmptyState } from "../../../components/EmptyState/EmptyState";
import { GENDERS } from "../../../constants/categories";
import { formatPrice } from "../../../constants/setPrice";
import { useCurrency } from "../../../contexts/CurrencyContext";

export function MainPage({
  currentGender,
  onButtonClick,
  onExploreProducts,
  products,
}) {
  const currency = useCurrency();
  const selectedGenderApiValue = GENDERS.find(
    (gender) => gender.apiValue === currentGender.apiValue,
  ).apiValue;
  if (!products) {
    return <div className="main-page">Brak produktów</div>;
  }
  const bestsellers = products.filter(
    (product) => product.gender === selectedGenderApiValue,
  );

  return (
    <div className="main-page">
      <Hero>
        <CenteredContent>
          <h1>Letnie promocje do -70%</h1>
          <p>Tylko najlepsze okazje!</p>
          <FullWidthButton onClick={onButtonClick} />
        </CenteredContent>
      </Hero>
      <Bestsellers>
        {bestsellers.length === 0 ? (
          <EmptyState
            title="Brak bestsellerów"
            description="W tej kategorii nie ma teraz polecanych produktów."
            actionLabel="Sprawdź wszystkie produkty"
            onAction={onExploreProducts}
          />
        ) : (
          <CenteredContent>
            {bestsellers.map((product) => (
              <Product
                key={product.id}
                id={product.id}
                name={product.productName}
                price={formatPrice(product.pricePLN, currency)}
                image={product.photos[0]}
              />
            ))}
          </CenteredContent>
        )}
      </Bestsellers>
    </div>
  );
}
