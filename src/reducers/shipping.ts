import {
  FETCH_SHIPPING_COST_BEGIN,
  SHIPPING_COST_RECEIVED,
  RESET_SHIPPING_COST,
} from "../constants/ActionTypes";

const initialState = {
  costReceived: false,
  cost: 0,
};

const shippingReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_SHIPPING_COST:
      return { ...state, cost: 0, costReceived: false };
    case FETCH_SHIPPING_COST_BEGIN:
      return { ...state, cost: 0, costReceived: false };
    case SHIPPING_COST_RECEIVED:
      return { ...state, cost: action.cost, costReceived: true };
    default:
      return state;
  }
};

export default shippingReducer;
