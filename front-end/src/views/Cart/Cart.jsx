import { CartProductsList } from "./CartProductsList";
import { CartSummary } from "./CartSummary";
import { FlexContainer } from "./FlexContainer";

export function Cart({ products }) {
  return (
    <FlexContainer>
      <h1>Koszyk</h1>
      <CartProductsList products={products} />
      <CartSummary products={products} />
    </FlexContainer>
  );
}
