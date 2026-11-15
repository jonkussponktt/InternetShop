import "./ExpandableMenu.css";
import { CATEGORIES } from "../../../constants/categories";
import accordionUp from "../../../assets/accordionUp.svg";
import accordionDown from "../../../assets/accordionDown.svg";

export function ExpandableMenu({
  currentCategory,
  currentSubcategory,
  currentGender,
  onCategoryClick,
  onSubcategoryClick,
}) {
  return (
    <div className="expandable-menu">
      <p className="header">{currentGender.categoryName}</p>
      <ul>
        {CATEGORIES.map((category) => (
          <li
            key={category.categoryName}
            onClick={() => {
              onCategoryClick(category.categoryName);
            }}
          >
            <span>{category.categoryName}</span>
            <img
              src={
                currentCategory === category.categoryName
                  ? accordionUp
                  : accordionDown
              }
            />
            {currentCategory === category.categoryName && (
              <ul>
                {category.subcategories.map((subcategory) => (
                  <li
                    key={subcategory.categoryName}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSubcategoryClick(subcategory.categoryName);
                    }}
                    className={
                      currentSubcategory === subcategory.categoryName
                        ? "current-subcategory"
                        : "subcategory"
                    }
                  >
                    {subcategory.categoryName}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
