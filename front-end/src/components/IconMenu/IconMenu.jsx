import "./IconMenu.css";
import heartIcon from "../../assets/heart.svg";
import bagIcon from "../../assets/bag.svg";

import { CountCircle } from "../CountCircle/CountCircle";

export function IconMenu({
  favouritesClickHandler,
  cartClickHandler,
  favouritesCount,
  cartCount = 0,
}) {
  return (
    <div className="icon-menu">
      <ul>
        <li className="heart">
          <img src={heartIcon} alt="Heart" onClick={favouritesClickHandler} />
          {favouritesCount > 0 && <CountCircle count={favouritesCount} />}
        </li>
        <li className="bag">
          <img src={bagIcon} alt="Bag" onClick={cartClickHandler} />
          {cartCount > 0 && <CountCircle count={cartCount} />}
        </li>
      </ul>
    </div>
  );
}
