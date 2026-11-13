import { Product } from "../MainPage/Product";
import { CenteredContent } from "../MainPage/CenteredContent";
import { formatPrice } from "../../constants/setPrice";
import { useCurrency } from "../../contexts/CurrencyContext";

export function Products({ products }) {
  const currency = useCurrency();

  return (
    <CenteredContent>
      {products.map((p) => (
        <Product
          key={p.id}
          id={p.id}
          name={p.productName}
          price={formatPrice(p.pricePLN, currency)}
          image={p.photos?.[0]}
        />
      ))}
    </CenteredContent>
  );
}
