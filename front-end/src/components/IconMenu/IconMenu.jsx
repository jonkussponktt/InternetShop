import "./IconMenu.css";
import heartIcon from "../../assets/heart.svg";
import bagIcon from "../../assets/bag.svg";

import { CountCircle } from "../CountCircle/CountCircle";

export function IconMenu({
  favouritesClickHandler,
  cartClickHandler,
  favouritesCount,
  cartCount,
}) {
  return (
    <div className="icon-menu">
      <ul>
        <li className="heart" onClick={favouritesClickHandler}>
          <img src={heartIcon} alt="Heart" />
          {favouritesCount > 0 && <CountCircle count={favouritesCount} />}
        </li>
        <li className="bag" onClick={cartClickHandler}>
          <img src={bagIcon} alt="Bag" />
          {cartCount > 0 && <CountCircle count={cartCount} />}
        </li>
      </ul>
    </div>
  );
}
