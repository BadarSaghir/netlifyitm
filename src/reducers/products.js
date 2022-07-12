import {
  FETCH_SINGLE_PRODUCT,
  CHANGE_CURRENCY,
  RECEIVE_PRODUCTS,
  APPLY_SEARCH,
  CLEAR_SEARCH,
} from "../constants/ActionTypes";

const initialState = {
  allProducts: [],
  products: [],
  symbol: "$",
  product_details: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        allProducts: action.products,
        products: action.products,
      };
    case FETCH_SINGLE_PRODUCT:
      if (
        state.products.findIndex(
          (product) => product.id === action.productId
        ) !== -1
      ) {
        const singleItem = state.products.reduce((itemAcc, product) => {
          return product;
        }, []);
        return { ...state, product_details: singleItem };
      }
      break;
    case APPLY_SEARCH:
      const filteredProducts = state.allProducts.filter((prod) =>
        prod.name.toLowerCase().includes(action.search.toLowerCase())
      );
      return { ...state, products: filteredProducts };
    case CLEAR_SEARCH:
      return { ...state, products: state.allProducts };
    case CHANGE_CURRENCY:
      return { ...state, symbol: action.symbol };
    default:
      return state;
  }
};
export default productReducer;
