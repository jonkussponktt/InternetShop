import "./MainMenu.css";
import { GENDERS } from "../../constants/categories";

export function MainMenu({ active, currentGenderCallback }) {
  return (
    <div className="main-menu">
      {GENDERS.map(({ categoryName }) => (
        <button
          key={categoryName}
          className={
            categoryName === active?.categoryName
              ? "main-menu-button-active"
              : ""
          }
          onClick={currentGenderCallback}
        >
          {categoryName}
        </button>
      ))}
    </div>
  );
}
