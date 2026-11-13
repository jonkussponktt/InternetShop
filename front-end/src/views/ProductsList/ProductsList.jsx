import "./styles/ProductsList/ProductsList.css";
import { ExpandableMenu } from "./ExpandableMenu";
import { Breadcrumbs } from "./Breadcrumbs";
import { Products } from "./Products";
import { Pagination } from "./Pagination";

export function ProductsList({
  products,
  currency,
  currentGender,
  currentCategory,
  categoryClickCallback,
  categoryBreadcrumbClickCallback,
  currentSubcategory,
  subcategoryClickCallback,
  subcategoryBreadcrumbClickCallback,
  onProductChosen,
  onFavouriteAdd,
}) {
  return (
    <div className="products-list-layout">
      <ExpandableMenu
        currentCategory={currentCategory}
        currentSubcategory={currentSubcategory}
        currentGender={currentGender}
        onCategoryClick={categoryClickCallback}
        onSubcategoryClick={subcategoryClickCallback}
      />
      <Breadcrumbs
        currentCategory={currentCategory}
        currentSubcategory={currentSubcategory}
        currentGender={currentGender}
        onCategoryClick={categoryBreadcrumbClickCallback}
        onHeaderClick={subcategoryBreadcrumbClickCallback}
      />
      <h1 className="products-list-heading">
        {currentSubcategory || currentCategory}
      </h1>
      <Products
        products={products}
        onProductChosen={onProductChosen}
        onFavouriteAdd={onFavouriteAdd}
        currency={currency}
      />
      <Pagination pagesNumber={5} />
    </div>
  );
}
