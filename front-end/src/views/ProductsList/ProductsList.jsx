import "./styles/ProductsList/ProductsList.css";
import { ExpandableMenu } from "./ExpandableMenu";
import { Breadcrumbs } from "./Breadcrumbs";
import { Products } from "./Products";
import { Pagination } from "./Pagination";
import { EmptyState } from "../../components/EmptyState/EmptyState";

export function ProductsList({
  products,
  favouriteProducts,
  currentGender,
  currentCategory,
  productsLimit,
  currentPage,
  pagesNumber,
  pageNumberClickCallback,
  categoryClickCallback,
  categoryBreadcrumbClickCallback,
  currentSubcategory,
  subcategoryClickCallback,
  subcategoryBreadcrumbClickCallback,
  onBackToHome,
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
      {products.length === 0 ? (
        <EmptyState
          title="Nie znaleziono produktów"
          description="Spróbuj zmienić wybrane kryteria lub wróć na stronę główną, aby sprawdzić inne produkty."
          actionLabel="Wróć na stronę główną"
          onAction={onBackToHome}
        />
      ) : (
        <>
          <Products
            products={products}
            favouriteProducts={favouriteProducts}
            productsLimit={productsLimit}
          />
          <Pagination
            pagesNumber={pagesNumber}
            currentPage={currentPage}
            pageNumberClickCallback={pageNumberClickCallback}
          />
        </>
      )}
    </div>
  );
}
