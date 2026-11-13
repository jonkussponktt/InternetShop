import "./styles/MainPage/MainPage.css";
import { Hero } from "./Hero";
import { CenteredContent } from "./CenteredContent";
import { FullWidthButton } from "./FullWidthButton";
import { Bestsellers } from "./Bestsellers";
import { Product } from "./Product";
import { GENDERS } from "../../constants/categories";
import { formatPrice } from "../../constants/setPrice";
import { useCurrency } from "../../contexts/CurrencyContext";

export function MainPage({
  currentGender,
  products,
  onButtonClick,
}) {
  const currency = useCurrency();
  const selectedGenderApiValue = GENDERS.find(
    (gender) => gender.apiValue === currentGender.apiValue,
  ).apiValue;
  if (!products) {
    return <div className="main-page">Brak produktów</div>;
  }

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
        <CenteredContent>
          {products
            .filter((p) => p.gender === selectedGenderApiValue)
            .map((product) => (
              <Product
                key={product.id}
                id={product.id}
                name={product.productName}
                price={formatPrice(product.pricePLN, currency)}
                image={product.photos[0]}
              />
            ))}
        </CenteredContent>
      </Bestsellers>
    </div>
  );
}
