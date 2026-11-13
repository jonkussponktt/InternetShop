export function formatPrice(pricePLN, currency) {
  let amount = pricePLN;

  switch (currency) {
    case "USD":
      amount = pricePLN / 4.0;
      break;
    case "EUR":
      amount = pricePLN / 4.4;
      break;
  }

  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency,
  }).format(amount);
}
