import { CartProductsList } from "../CartProductsList/CartProductsList";
import { CartSummary } from "../CartSummary/CartSummary";
import { FlexContainer } from "../FlexContainer/FlexContainer";

export function Cart({ onExploreProducts }) {
  return (
    <FlexContainer>
      <h1>Koszyk</h1>
      <CartProductsList onExploreProducts={onExploreProducts} />
      <CartSummary />
    </FlexContainer>
  );
}
