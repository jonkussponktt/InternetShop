import { useState } from "react";

import "./styles/Breadcrumbs/Breadcrumbs.css";
import breadcrumbNext from "../../assets/breadcrumbNext.svg";

export function Breadcrumbs({
  currentCategory,
  currentSubcategory,
  currentGender,
  onCategoryClick,
  onHeaderClick,
}) {
  const [genderHovered, setGenderHovered] = useState(false);
  const [categoryHovered, setCategoryHovered] = useState(false);
  return (
    <div className="breadcrumbs">
      <span
        onClick={() => onHeaderClick("")}
        onMouseEnter={() => {
          if (currentCategory) {
            setGenderHovered(true);
          }
        }}
        onMouseLeave={() => setGenderHovered(false)}
        className={genderHovered ? "hovered" : ""}
      >
        {currentGender.categoryName}
      </span>
      {currentCategory ? (
        <>
          <img src={breadcrumbNext} />
          <span
            onClick={onCategoryClick}
            onMouseEnter={() => {
              if (currentSubcategory) {
                setCategoryHovered(true);
              }
            }}
            onMouseLeave={() => setCategoryHovered(false)}
            className={categoryHovered ? "hovered" : ""}
          >
            {currentCategory}
          </span>

          {currentSubcategory ? (
            <>
              <img src={breadcrumbNext} />
              <span>{currentSubcategory}</span>
            </>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
}
