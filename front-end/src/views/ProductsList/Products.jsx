import { Product } from "../MainPage/Product";
import { CenteredContent } from "../MainPage/CenteredContent";
import { formatPrice } from "../../constants/setPrice";

export function Products({
  products,
  onProductChosen,
  onFavouriteAdd,
  currency,
}) {
  return (
    <CenteredContent>
      {products.map((p) => (
        <Product
          key={p.id}
          id={p.id}
          name={p.productName}
          price={formatPrice(p.pricePLN, currency)}
          image={p.photos?.[0]}
          onHeartClick={onFavouriteAdd}
          onProductChosen={onProductChosen}
        />
      ))}
    </CenteredContent>
  );
}
