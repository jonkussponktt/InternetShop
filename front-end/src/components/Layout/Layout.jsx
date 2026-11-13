import { MainContent } from "../MainContent/MainContent";
import { TopBar } from "../TopBar/TopBar";
import { MainMenu } from "../MainMenu/MainMenu";
import { Logo } from "../Logo/Logo";
import { CurrencySelector } from "../CurrencySelector/CurrencySelector";
import { IconMenu } from "../IconMenu/IconMenu";
import { CategoriesMenu } from "../CategoriesMenu/CategoriesMenu";
import { Footer } from "../Footer/Footer";
import { MainPage } from "../../views/MainPage/MainPage";
import { GENDERS, CATEGORIES } from "../../constants/categories";
import { FavouritesList } from "../../views/Favourites/FavouritesList";
import { Cart } from "../../views/Cart/Cart";
import { ProductsList } from "../../views/ProductsList/ProductsList";
import { ProductDetails } from "../../views/ProductDetails/ProductDetails";
import { CurrencyProvider } from "../../contexts/CurrencyProvider";
import { ProductActionsProvider } from "../../contexts/ProductActionsProvider";
import { useState, useEffect, useCallback, useMemo } from "react";

export function Layout() {
  const [currency, setCurrency] = useState("PLN");
  const [currentGender, setCurrentGender] = useState(GENDERS[0]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentSubcategory, setCurrentSubcategory] = useState(null);
  const [currentProductId, setCurrentProductId] = useState(0);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentView, setCurrentView] = useState("default");
  const [products, setProducts] = useState([]);
  const [favouriteProducts, setFavouriteProducts] = useState([]);
  const [favouritesRevision, setFavouritesRevision] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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
          const data = await fetchData(
            `http://localhost:3000/products?gender=${currentGender.apiValue}`,
          );
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
  }, [currentGender, currentView, currentProductId]);

  useEffect(() => {
    let ignore = false;

    async function loadFavourites() {
      const data = await fetchData(`http://localhost:3000/favourites`);
      if (!Array.isArray(data)) {
        throw new Error("The favourites resource did not return an array");
      }
      const loadedFavouriteProducts = await Promise.all(
        data.map((favourite) =>
          fetchData(`http://localhost:3000/products/${favourite.productId}`),
        ),
      );
      if (!ignore) {
        setFavouriteProducts(loadedFavouriteProducts);
      }
    }

    async function loadFavouriteProducts() {
      await loadFavourites();
    }

    if (currentView === "favourites") {
      loadFavouriteProducts();
    }
    return () => {
      ignore = true;
    };
  }, [currentView, favouritesRevision]);

  const addToFavourites = useCallback((id, name) => {
    if (!favouriteProducts?.some((f) => f.productName === name)) {
      fetch("http://localhost:3000/favourites", {
        method: "POST",
        body: JSON.stringify({ productId: id }),
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            fetch(`http://localhost:3000/products/${data.productId}`).then(
              (response) =>
                response.json().then((newFavProduct) => {
                  setFavouriteProducts((prevFavouriteProducts) => {
                    return [...prevFavouriteProducts, newFavProduct];
                  });
                }),
            );
          });
        }
      });
    }
  }, [favouriteProducts]);

  const handleProductChosen = useCallback((id) => {
    setCurrentProductId(id);
    setCurrentProduct(null);
    setCurrentView("productDetails");
  }, []);

  const productActions = useMemo(
    () => ({
      onProductChosen: handleProductChosen,
      onFavouriteAdd: addToFavourites,
    }),
    [handleProductChosen, addToFavourites],
  );

  async function handleProductDeleted(productId) {
    const toBeDeletedId = await fetch(`http://localhost:3000/favourites`)
      .then((response) =>
        response
          .json()
          .then((products) =>
            products.filter((p) => p.productId === productId),
          ),
      )
      .then((prod) => prod[0]?.id)
      .catch((e) => console.error(e));
    if (toBeDeletedId) {
      fetch(`http://localhost:3000/favourites/${toBeDeletedId}`, {
        method: "DELETE",
      }).then((response) => {
        if (response.ok) {
          const newFavourites = (prevFavouriteProducts) =>
            prevFavouriteProducts.filter((p) => p.id !== toBeDeletedId);
          setFavouriteProducts(newFavourites);
          setFavouritesRevision((revision) => revision + 1);
        }
      });
    }
  }

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
                favouritesCount={favouriteProducts.length}
              />
            </TopBar>
          </MainContent>
          <CategoriesMenu
            currentCategory={currentCategory}
            currentCategoryCallback={(e) => {
              setCurrentCategory(e.target.textContent);
            }}
          />
          {currentView === "favourites" ? (
            <FavouritesList
              products={favouriteProducts}
              onProductDeleted={handleProductDeleted}
            />
          ) : currentView === "cart" ? (
            <Cart products={[]} />
          ) : currentView === "products" ? (
            <ProductsList
              products={products}
              currentGender={currentGender}
              currentCategory={currentCategory}
              categoryClickCallback={(categoryName) => {
                setCurrentCategory((prevCurrentCategory) => {
                  if (categoryName === prevCurrentCategory) {
                    return "";
                  }
                  setCurrentSubcategory("");
                  return categoryName;
                });
              }}
              categoryBreadcrumbClickCallback={() => {
                if (currentSubcategory) {
                  setCurrentSubcategory("");
                }
              }}
              currentSubcategory={currentSubcategory}
              subcategoryClickCallback={(subcategoryName) =>
                setCurrentSubcategory(subcategoryName)
              }
              subcategoryBreadcrumbClickCallback={() => {
                setCurrentSubcategory("");
                setCurrentCategory("");
              }}
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
              currentCategory={currentCategory}
              products={products}
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
