import {
  SHOW_LOADING_OVERLAY,
  HIDE_LOADING_OVERLAY,
} from "../constants/ActionTypes";

const initialState = {
  isLoading: false,
};

const loadingOverlayReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADING_OVERLAY:
      return { ...state, isLoading: true };
    case HIDE_LOADING_OVERLAY:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default loadingOverlayReducer;
