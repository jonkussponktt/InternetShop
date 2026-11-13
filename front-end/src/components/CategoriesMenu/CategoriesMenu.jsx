import "./CategoriesMenu.css";
import { CATEGORIES } from "../../constants/categories";

export function CategoriesMenu({ currentCategoryCallback }) {
  return (
    <div className="categories-menu">
      {CATEGORIES.map(({ categoryName }) => (
        <button key={categoryName} onClick={currentCategoryCallback}>
          {categoryName}
        </button>
      ))}
    </div>
  );
}
