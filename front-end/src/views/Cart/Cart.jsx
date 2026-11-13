import { CartProductsList } from "./CartProductsList";
import { CartSummary } from "./CartSummary";
import { FlexContainer } from "./FlexContainer";

export function Cart({ products, currency }) {
  return (
    <FlexContainer>
      <h1>Koszyk</h1>
      <CartProductsList products={products} currency={currency} />
      <CartSummary products={products} currency={currency} />
    </FlexContainer>
  );
}
