import {
  FETCH_COUNTRIES_BEGIN,
  COUNTRIES_LOADED,
} from "../constants/ActionTypes";

const initialState = {
  countriesList: [],
};

const countriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUNTRIES_BEGIN:
      return { ...state, countriesList: [] };
    case COUNTRIES_LOADED:
      return { ...state, countriesList: action.countries };
    default:
      return state;
  }
};

export default countriesReducer;
