import { formatPrice } from "../../constants/setPrice";
import { useCurrency } from "../../contexts/CurrencyContext";
import { useProductActions } from "../../contexts/ProductActionsContext";

export function CartProduct({ id, name, price, image }) {
  const currency = useCurrency();
  const { onProductChosen, onAddToCart, onRemoveFromCart } =
    useProductActions();
  const cart = localStorage.getItem("cartProducts");
  const current = cart ? JSON.parse(cart) : [];
  const quantity = current.filter((c) => c === id).length;

  return (
    <div className="cart-product">
      <img src={image} alt={name} onClick={() => onProductChosen(id)} />
      <h3 className="productName" onClick={() => onProductChosen(id)}>
        {name}
      </h3>
      <h3 className="price">{formatPrice(price, currency)}</h3>
      <p>Cena: {formatPrice(price, currency)}</p>

      <label>Wybierz ilość</label>
      <select
        name="quantity"
        id="quantity"
        defaultValue={quantity}
        onChange={(e) => {
          const newQuantity = e.target.value;
          console.log(`newQuantity: ${newQuantity}, quantity: ${quantity}`);
          if (newQuantity > quantity) {
            console.log(`newQuantity: ${newQuantity} > quantity: ${quantity}`);
            for (let i = 0; i < newQuantity - quantity; i++) {
              onAddToCart(id);
            }
          } else if (newQuantity < quantity) {
            console.log(`newQuantity: ${newQuantity} < quantity: ${quantity}`);
            for (let i = 0; i < quantity - newQuantity; i++) {
              onRemoveFromCart(id);
            }
          }
        }}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <button key="remove" onClick={() => onRemoveFromCart(id, true)}>
        Usuń
      </button>
    </div>
  );
}
