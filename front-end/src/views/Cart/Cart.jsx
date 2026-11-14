import { CartProductsList } from "./CartProductsList";
import { CartSummary } from "./CartSummary";
import { FlexContainer } from "./FlexContainer";

export function Cart({ products, onExploreProducts }) {
  return (
    <FlexContainer>
      <h1>Koszyk</h1>
      <CartProductsList
        products={products}
        onExploreProducts={onExploreProducts}
      />
      <CartSummary products={products} />
    </FlexContainer>
  );
}
