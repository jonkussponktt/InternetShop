import { MainContent } from "../MainContent/MainContent";
import { TopBar } from "../TopBar/TopBar";
import { MainMenu } from "../MainMenu/MainMenu";
import { Logo } from "../Logo/Logo";
import { CurrencySelector } from "../CurrencySelector/CurrencySelector";
import { IconMenu } from "../IconMenu/IconMenu";
import { CategoriesMenu } from "../CategoriesMenu/CategoriesMenu";
import { Footer } from "../Footer/Footer";
import { MainPage } from "../../views/MainPage/MainPage/MainPage";
import {
  GENDERS,
  CATEGORIES,
} from "../../constants/categories";
import {
  DEFAULT_PRODUCTS_PER_PAGE,
  DEFAULT_CURRENT_PAGE,
} from "../../config/appConfig";
import { FavouritesList } from "../../views/Favourites/FavouritesList/FavouritesList";
import { Cart } from "../../views/Cart/Cart/Cart";
import { ProductsList } from "../../views/ProductsList/ProductsList/ProductsList";
import { ProductDetails } from "../../views/ProductDetails/ProductDetails/ProductDetails";
import { CurrencyProvider } from "../../contexts/CurrencyProvider";
import { ProductActionsProvider } from "../../contexts/ProductActionsProvider";
import { FavouritesProvider } from "../../contexts/FavouritesProvider";
import { CartProvider } from "../../contexts/CartProvider";
import { useState, useEffect, useCallback, useMemo } from "react";

export function Layout() {
  return (
    <CartProvider>
      <FavouritesProvider>
        <LayoutContent />
      </FavouritesProvider>
    </CartProvider>
  );
}

function LayoutContent() {
  const [currency, setCurrency] = useState("PLN");
  const [currentGender, setCurrentGender] = useState(GENDERS[0]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentSubcategory, setCurrentSubcategory] = useState(null);
  const [currentProductId, setCurrentProductId] = useState(0);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentView, setCurrentView] = useState("default");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productsLimit] = useState(DEFAULT_PRODUCTS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
  const [pagesNumber, setPagesNumber] = useState(1);

  async function fetchData(request) {
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    return response.json();
  }

  useEffect(() => {
    let ignore = false;

    async function loadProducts() {
      try {
        setIsLoading(true);
        if (currentView === "default") {
          const data = await fetchData(
            `http://localhost:3000/${currentGender.apiValue}`,
          );
          if (!Array.isArray(data.bestsellers)) {
            throw new Error(
              `The ${currentGender.apiValue} resource has no bestsellers array`,
            );
          }
          if (!ignore) {
            setProducts(data.bestsellers);
          }
        } else if (currentView === "products") {
          const base = `http://localhost:3000/products?gender=${currentGender.apiValue}`;
          const queryWithCategory =
            base +
            (currentCategory !== null && currentCategory !== undefined
              ? `&category=${currentCategory.path}`
              : "");
          const queryWithSubcategory =
            queryWithCategory +
            (currentSubcategory
              ? `&subcategory=${currentSubcategory.path}`
              : "");
          const fullQuery =
            queryWithSubcategory +
            `&_limit=${productsLimit}&_page=${currentPage}`;
          const data = await fetch(fullQuery).then(async (response) => {
            if (response.ok) {
              const data = await response.json();
              const tmpTotalCount = response.headers.get("X-Total-Count");
              setPagesNumber(Math.ceil(tmpTotalCount / productsLimit));
              return data;
            }
          });
          if (!Array.isArray(data)) {
            throw new Error("The products resource did not return an array");
          }
          if (!ignore) {
            setProducts(data);
          }
        } else if (currentView === "productDetails") {
          const data = await fetchData(
            `http://localhost:3000/products/${currentProductId}`,
          );
          if (!data) {
            throw new Error("Nie odnaleziono produktu o danym id");
          }
          if (!ignore) {
            setCurrentProduct(data);
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();
    return () => {
      ignore = true;
    };
  }, [
    currentGender,
    currentView,
    currentProductId,
    currentCategory,
    currentSubcategory,
    currentPage,
    productsLimit,
  ]);

  const handleProductChosen = useCallback((id) => {
    setCurrentProductId(id);
    setCurrentProduct(null);
    setCurrentView("productDetails");
  }, []);

  const handleExploreProducts = useCallback(() => {
    setCurrentView("products");
  }, []);

  const productActions = useMemo(
    () => ({
      onProductChosen: handleProductChosen,
    }),
    [handleProductChosen],
  );

  if (isLoading) {
    return <p>Trwa ładowanie produktów...</p>;
  }

  return (
    <CurrencyProvider currency={currency}>
      <ProductActionsProvider actions={productActions}>
        <div className="layout">
          <MainContent>
            <TopBar>
              <MainMenu
                active={currentGender}
                currentGenderCallback={(e) => {
                  const tmp = e.target.textContent;
                  const gender = GENDERS.find((g) => g.categoryName === tmp);
                  setCurrentGender(gender);
                  if (currentView !== "products") {
                    setCurrentView("default");
                  }
                }}
              />
              <Logo comebackHandler={() => setCurrentView("default")} />
              <CurrencySelector onCurrencySelect={setCurrency} />
              <IconMenu
                favouritesClickHandler={() => {
                  setCurrentView("favourites");
                }}
                cartClickHandler={() => {
                  setCurrentView("cart");
                }}
              />
            </TopBar>
          </MainContent>
          <CategoriesMenu
            currentCategory={currentCategory?.categoryName}
            currentCategoryCallback={(e) => {
              const tmp = e.target.textContent;
              const category = CATEGORIES.find((c) => c.categoryName === tmp);
              setCurrentCategory(category);
              setCurrentView("products");
            }}
          />
          {currentView === "favourites" ? (
            <FavouritesList onExploreProducts={handleExploreProducts} />
          ) : currentView === "cart" ? (
            <Cart onExploreProducts={handleExploreProducts} />
          ) : currentView === "products" ? (
            <ProductsList
              products={products}
              currentGender={currentGender}
              currentCategory={currentCategory?.categoryName}
              productsLimit={productsLimit}
              currentPage={currentPage - 1}
              pagesNumber={pagesNumber}
              pageNumberClickCallback={(pageNumber) => {
                setCurrentPage(pageNumber);
              }}
              categoryClickCallback={(categoryName) => {
                setCurrentCategory((prevCurrentCategory) => {
                  if (categoryName === prevCurrentCategory) {
                    return null;
                  }
                  setCurrentSubcategory(null);
                  const category = CATEGORIES.find(
                    (c) => c.categoryName === categoryName,
                  );
                  return category;
                });
                setCurrentPage(DEFAULT_CURRENT_PAGE);
              }}
              categoryBreadcrumbClickCallback={() => {
                if (currentSubcategory) {
                  setCurrentSubcategory(null);
                  setCurrentPage(DEFAULT_CURRENT_PAGE);
                }
              }}
              currentSubcategory={currentSubcategory?.categoryName}
              subcategoryClickCallback={(subcategoryName) => {
                if (currentCategory?.subcategories) {
                  setCurrentSubcategory(
                    currentCategory.subcategories.find(
                      (subCat) => subCat.categoryName === subcategoryName,
                    ),
                  );
                  setCurrentPage(DEFAULT_CURRENT_PAGE);
                }
              }}
              subcategoryBreadcrumbClickCallback={() => {
                setCurrentSubcategory(null);
                setCurrentCategory(null);
                setCurrentPage(DEFAULT_CURRENT_PAGE);
              }}
              onBackToHome={() => setCurrentView("default")}
            />
          ) : currentView === "productDetails" ? (
            currentProduct ? (
              <ProductDetails product={currentProduct} />
            ) : (
              <p>Trwa ładowanie produktu...</p>
            )
          ) : (
            <MainPage
              currentGender={currentGender}
              currentCategory={currentCategory?.categoryName}
              products={products}
              onExploreProducts={handleExploreProducts}
              onButtonClick={(id) => {
                setCurrentProductId(id);
                setCurrentView("products");
              }}
            />
          )}
          <Footer />
        </div>
      </ProductActionsProvider>
    </CurrencyProvider>
  );
}
