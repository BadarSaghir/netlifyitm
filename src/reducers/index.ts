import { combineReducers } from "redux";
import { IntlReducer as Intl, IntlProvider } from "react-redux-multilingual";

// Import custom components
import productReducer from "./products";
import cartReducer from "./cart";
import filtersReducer from "./filters";
import wishlistReducer from "./wishlist";
import compareReducer from "./compare";
import loadingOverlayReducer from "./loadingOverlay";
import countriesReducer from "./countries";
import shippingReducer from "./shipping";
import contentReducer from "./content";

const rootReducer = combineReducers({
  data: productReducer,
  cartList: cartReducer,
  filters: filtersReducer,
  wishlist: wishlistReducer,
  compare: compareReducer,
  loadingOverlay: loadingOverlayReducer,
  countries: countriesReducer,
  shipping: shippingReducer,
  content: contentReducer,
  Intl,
});

export default rootReducer;
