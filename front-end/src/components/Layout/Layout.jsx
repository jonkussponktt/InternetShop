import { MainContent } from "../MainContent/MainContent";
import { TopBar } from "../TopBar/TopBar";
import { MainMenu } from "../MainMenu/MainMenu";
import { Logo } from "../Logo/Logo";
import { CurrencySelector } from "../CurrencySelector/CurrencySelector";
import { IconMenu } from "../IconMenu/IconMenu";
import { CategoriesMenu } from "../CategoriesMenu/CategoriesMenu";
import { Footer } from "../Footer/Footer";
import { MainPage } from "../../views/MainPage/MainPage";
import {
  GENDERS,
  CATEGORIES,
  MAX_ONE_KIND_IN_CART,
  MIN_ONE_KIND_IN_CART,
} from "../../constants/categories";
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
  const [favouritesStatus, setFavouritesStatus] = useState("loading");
  const [favouritesRevision, setFavouritesRevision] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const cartStorage = localStorage.getItem("cartProducts");
  const cart = useMemo(
    () => (cartStorage ? JSON.parse(cartStorage) : []),
    [cartStorage],
  );
  const [cartStorageLength, setCartStorageLength] = useState(cart.length);
  const [currentCart, setCurrentCart] = useState(cart ? cart : 0);

  async function fetchData(request) {
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    return response.json();
  }

  useEffect(() => {
    if (!cart) {
      localStorage.setItem("cartProducts", "");
    }
  }, [cart]);

  useEffect(() => {
    let ignore = false;

    async function fetchCartProductsFromLocalStorage() {
      const cart = localStorage.getItem("cartProducts");
      const current = cart ? JSON.parse(cart) : [];
      const currentCartProducts = await Promise.all(
        current.map((productId) =>
          fetchData(`http://localhost:3000/products/${productId}`),
        ),
      );
      setCurrentCart(currentCartProducts);
    }

    async function fetchCartProducts() {
      await fetchCartProductsFromLocalStorage();
    }

    if (!ignore) {
      fetchCartProducts();
    }
    return () => {
      ignore = true;
    };
  }, [currentView]);

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
          const query =
            base +
            (currentCategory !== null && currentCategory !== undefined
              ? `&category=${currentCategory.path}`
              : "");
          const finalQuery =
            query +
            (currentSubcategory
              ? `&subcategory=${currentSubcategory.path}`
              : "");
          const data = await fetchData(finalQuery);
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
  ]);

  useEffect(() => {
    let ignore = false;

    async function loadFavourites() {
      setFavouritesStatus("loading");
      try {
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
          setFavouritesStatus("ready");
        }
      } catch (error) {
        console.error("Error fetching favourite products:", error);
        if (!ignore) {
          setFavouritesStatus("error");
        }
      }
    }

    loadFavourites();
    return () => {
      ignore = true;
    };
  }, [currentView, favouritesRevision]);

  const addToFavourites = useCallback(
    (id) => {
      if (!favouriteProducts?.some((f) => f.id === id)) {
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
    },
    [favouriteProducts],
  );

  const removeFromFavourites = useCallback(
    async (id) => {
      if (favouriteProducts?.some((f) => f.id === id)) {
        await handleProductDeletedFromFavourites(id);
      }
    },
    [favouriteProducts],
  );

  const handleProductChosen = useCallback((id) => {
    setCurrentProductId(id);
    setCurrentProduct(null);
    setCurrentView("productDetails");
  }, []);

  const handleExploreProducts = useCallback(() => {
    setCurrentView("products");
  }, []);

  const addProductToCart = useCallback(async (id) => {
    const cart = localStorage.getItem("cartProducts");
    const current = cart ? JSON.parse(cart) : [];
    if (!current.includes(id)) {
      const newProduct = await fetchData(
        `http://localhost:3000/products/${id}`,
      );
      setCurrentCart((previous) => [...previous, newProduct]);
    }


    if (current.filter((p) => p === id).length < MAX_ONE_KIND_IN_CART) {
      const cartProducts = [...current, id];
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
      setCartStorageLength((prevLength) => prevLength + 1);
    } else {
      console.error("Cannot add more than 5 products of one type to the cart");
    }
  }, []);

  const removeProductFromCart = useCallback((id, bulk = false) => {
    const cart = localStorage.getItem("cartProducts");
    const current = cart ? JSON.parse(cart) : [];
    const currentQuantity = current.filter(
      (productId) => productId === id,
    ).length;

    // if we delete all the items from Cart by clicking "Delete" button => bulk deletion
    if (currentQuantity === MIN_ONE_KIND_IN_CART || bulk) {
      setCurrentCart((previous) =>
        previous.filter((product) => product.id !== id),
      );
      const otherCartProducts = current.filter((productId) => productId !== id);
      localStorage.setItem("cartProducts", JSON.stringify(otherCartProducts));
      setCartStorageLength((prevLength) => prevLength - currentQuantity);
    } else {
      // decreasing the number by one in "Choose quantity" dropdown

      const lastIndexOfProduct = current.lastIndexOf(id);
      current.splice(lastIndexOfProduct, 1);
      localStorage.setItem("cartProducts", JSON.stringify(current));
      setCartStorageLength((prevLength) => prevLength - 1);
    }
  }, []);

  const productActions = useMemo(
    () => ({
      onProductChosen: handleProductChosen,
      onFavouriteAdd: addToFavourites,
      onFavouriteRemove: removeFromFavourites,
      onAddToCart: addProductToCart,
      onRemoveFromCart: removeProductFromCart,
    }),
    [
      handleProductChosen,
      addToFavourites,
      removeFromFavourites,
      addProductToCart,
      removeProductFromCart,
    ],
  );

  async function handleProductDeletedFromFavourites(productId) {
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
          setFavouritesStatus("loading");
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
                  console.log(gender);
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
                favouritesCount={favouriteProducts.length}
                cartCount={cartStorageLength}
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
            <FavouritesList
              products={favouriteProducts}
              onProductDeleted={handleProductDeletedFromFavourites}
              onExploreProducts={handleExploreProducts}
              status={favouritesStatus}
            />
          ) : currentView === "cart" ? (
            <Cart
              products={currentCart}
              onExploreProducts={handleExploreProducts}
            />
          ) : currentView === "products" ? (
            <ProductsList
              products={products}
              favouriteProducts={favouriteProducts}
              currentGender={currentGender}
              currentCategory={currentCategory?.categoryName}
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
              }}
              categoryBreadcrumbClickCallback={() => {
                if (currentSubcategory) {
                  setCurrentSubcategory(null);
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
                }
              }}
              subcategoryBreadcrumbClickCallback={() => {
                setCurrentSubcategory(null);
                setCurrentCategory(null);
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
              favouriteProducts={favouriteProducts}
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
