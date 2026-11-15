import { CartProductsList } from "./CartProductsList";
import { CartSummary } from "./CartSummary";
import { FlexContainer } from "./FlexContainer";

export function Cart({ onExploreProducts }) {
  return (
    <FlexContainer>
      <h1>Koszyk</h1>
      <CartProductsList onExploreProducts={onExploreProducts} />
      <CartSummary />
    </FlexContainer>
  );
}
