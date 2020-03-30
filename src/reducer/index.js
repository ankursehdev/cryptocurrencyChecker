import { combineReducers } from "redux";

import {
  REQUEST_CURRENCY,
  SET_CURRENCY,
  REQUEST_CURRENCY_DETAILS,
  ADD_TO_SELECT_LIST_AFTER_DELETE,
  ADD_BACK_TO_TABLE_FROM_SELECT,
  DELETE_FROM_SELECT_LIST,
  ERROR_RECEIVED,
  REQUEST_SINGLE_CURRENCY
} from "../constants/ActionTypes";

const intialState = {
  selectItemsIsLoading: true,
  selectItemsError: null,
  selectItems: [],

  tableItemsIsLoding: true,
  tableItemsError: null,
  tableItems: [],
  isSingleItemLoading: false
};

function initialCurrencyData(state = intialState, action) {
  switch (action.type) {
    case REQUEST_CURRENCY:
      return {
        ...state,
        selectItemsIsLoading: true,
        tableItemsIsLoding: true
      };
    case SET_CURRENCY:
      return {
        ...state,
        selectItems: action.currency,
        selectItemsIsLoading: false,
        tableItemsIsLoding: true
      };
    case REQUEST_CURRENCY_DETAILS:
      return {
        ...state,
        tableItems: action.currencyDetails,
        tableItemsIsLoding: false
      };
    case REQUEST_SINGLE_CURRENCY:
      return {
        ...state,
        isSingleItemLoading: true
      };
    case ADD_TO_SELECT_LIST_AFTER_DELETE:
      return {
        ...state,
        tableItems: state.tableItems.filter(e => e.name !== action.data),
        selectItems: state.selectItems.concat(action.data)
      };
    case ADD_BACK_TO_TABLE_FROM_SELECT:
      return {
        ...state,
        tableItems: state.tableItems.concat(action.selectedOption),
        isSingleItemLoading: false
      };
    case DELETE_FROM_SELECT_LIST:
      return {
        ...state,
        selectItems: state.selectItems.filter(e => e !== action.itemToDelete)
      };
    case ERROR_RECEIVED:
      return {
        ...state,
        selectItemsError: action.error,
        tableItemsError: action.error
      };
    default:
      return state;
  }
}

export default combineReducers({
  initialCurrencyData
});
