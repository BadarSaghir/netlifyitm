import { getShippingCost } from "./../api/shop";
import shop, { getAllPrintfulCountries } from "../api/shop";
import * as types from "../constants/ActionTypes";
import store from "../store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import content from "../data.json";

export const showLoadingOverlay = () => ({
  type: types.SHOW_LOADING_OVERLAY,
});

export const hideLoadingOverlay = () => ({
  type: types.HIDE_LOADING_OVERLAY,
});

export const fetchProductsBegin = () => ({
  type: types.FETCH_PRODUCTS_BEGIN,
});

export const receiveProducts = (products) => ({
  type: types.RECEIVE_PRODUCTS,
  products,
});

export const loadContent = (content) => ({
  type: types.LOAD_CONTENT,
  content,
});

// export const getAllProducts = () => async (dispatch) => {
//   dispatch(showLoadingOverlay());
//   dispatch(fetchProductsBegin());
//   const productResponse = await shop.getProductsNew();
//   const products = productResponse.data;

//   console.log("All Products totlal", products.length);

//   const notDisabledProducts = products.filter(
//     (prod) => prod.disabled === false
//   );
//   dispatch(receiveProducts(notDisabledProducts));
//   dispatch(hideLoadingOverlay());
//   console.log("Not Disabled totlal", notDisabledProducts.length);

//   // shop.getProducts((products) => {
//   //   const notDisabledProducts = products.filter(
//   //     (prod) => prod.disabled === false
//   //   );
//   //   dispatch(receiveProducts(notDisabledProducts));
//   // });
// };

export const getAllProducts = () => async (dispatch) => {
  dispatch(showLoadingOverlay());
  dispatch(fetchProductsBegin());
  const productResponse = await shop.loadProducts();
  const products = productResponse;

  console.log("All Products totlal", products.length);

  const notDisabledProducts = products.filter(
    (prod) => prod.disabled === false
  );
  dispatch(receiveProducts(notDisabledProducts));
  dispatch(hideLoadingOverlay());
  console.log("Not Disabled totlal", notDisabledProducts.length);

  // shop.getProducts((products) => {
  //   const notDisabledProducts = products.filter(
  //     (prod) => prod.disabled === false
  //   );
  //   dispatch(receiveProducts(notDisabledProducts));
  // });
};

export const applySearch = (search) => ({
  type: types.APPLY_SEARCH,
  search,
});

export const clearSearch = () => ({
  type: types.CLEAR_SEARCH,
});

export const searchProducts = (search) => (dispatch) => {
  dispatch(showLoadingOverlay());
  dispatch(applySearch(search));
  dispatch(hideLoadingOverlay());
};

export const fetchCountriesBegin = () => ({
  type: types.FETCH_COUNTRIES_BEGIN,
});

export const countriesLoaded = (countries) => ({
  type: types.COUNTRIES_LOADED,
  countries,
});

export const getCountries = () => async (dispatch) => {
  dispatch(showLoadingOverlay());
  dispatch(fetchCountriesBegin());
  const countries = await getAllPrintfulCountries();
  dispatch(countriesLoaded(countries.data.result));
  dispatch(hideLoadingOverlay());
};

export const fetchShipingCostBegin = () => ({
  type: types.FETCH_SHIPPING_COST_BEGIN,
});

export const shippingCostReceived = (cost) => ({
  type: types.SHIPPING_COST_RECEIVED,
  cost,
});

export const resetShipingCost = () => ({
  type: types.RESET_SHIPPING_COST,
});

export const getTotalShippingCost = (cartItems, userData) => async (
  dispatch
) => {
  dispatch(showLoadingOverlay());
  dispatch(fetchShipingCostBegin());
  const cost = await getShippingCost(cartItems, userData);
  const formatedCost = cost.toFixed(2);
  dispatch(shippingCostReceived(formatedCost));
  dispatch(hideLoadingOverlay());
};

export const fetchSingleProduct = (productId) => ({
  type: types.FETCH_SINGLE_PRODUCT,
  productId,
});

//it seems that I should probably use this as the basis for "Cart"
export const addToCart = (product, qty, SKU?) => (dispatch) => {
  toast.success("Item Added to Cart");
  dispatch(addToCartUnsafe(product, qty, SKU));
};
export const addToCartAndRemoveWishlist = (product, qty) => (dispatch) => {
  toast.success("Item Added to Cart");
  dispatch(addToCartUnsafe(product, qty));
  dispatch(removeFromWishlist(product));
};
export const addToCartUnsafe = (product, qty, SKU?) => ({
  type: types.ADD_TO_CART,
  product,
  qty,
  SKU: SKU,
});
export const removeFromCart = (product_id) => (dispatch) => {
  toast.error("Item Removed from Cart");
  dispatch({
    type: types.REMOVE_FROM_CART,
    product_id,
  });
};

export const emptyCart = () => ({
  type: types.EMPTY_CART,
});

export const incrementQty = (product, qty) => (dispatch) => {
  toast.success("Item Added to Cart");
  dispatch(addToCartUnsafe(product, qty));
};
export const decrementQty = (productId) => (dispatch) => {
  toast.warn("Item Decrement Qty to Cart");

  dispatch({
    type: types.DECREMENT_QTY,
    productId,
  });
};

//it seems that I should probably use this as the basis for "Wishlist"
export const addToWishlist = (product) => (dispatch) => {
  toast.success("Item Added to Wishlist");
  dispatch(addToWishlistUnsafe(product));
};
export const addToWishlistUnsafe = (product) => ({
  type: types.ADD_TO_WISHLIST,
  product,
});
export const removeFromWishlist = (product_id) => (dispatch) => {
  toast.error("Item Removed from Wishlist");
  dispatch({
    type: types.REMOVE_FROM_WISHLIST,
    product_id,
  });
};

//Compare Products
export const addToCompare = (product) => (dispatch) => {
  toast.success("Item Added to Compare");
  dispatch(addToCompareUnsafe(product));
};
export const addToCompareUnsafe = (product) => ({
  type: types.ADD_TO_COMPARE,
  product,
});
export const removeFromCompare = (product_id) => ({
  type: types.REMOVE_FROM_COMPARE,
  product_id,
});

// Filters
export const filterBrand = (brand) => ({
  type: types.FILTER_BRAND,
  brand,
});
export const filterColor = (color) => ({
  type: types.FILTER_COLOR,
  color,
});
export const filterPrice = (value) => ({
  type: types.FILTER_PRICE,
  value,
});
export const filterSort = (sort_by) => ({
  type: types.SORT_BY,
  sort_by,
});

// Currency
export const changeCurrency = (symbol) => ({
  type: types.CHANGE_CURRENCY,
  symbol,
});
