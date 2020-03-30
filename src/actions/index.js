import * as types from "../constants/ActionTypes";

/** Action Creators */
export const requestCurrency = () => ({
  type: types.REQUEST_CURRENCY,
  isLoading: true
});

export const requestSingleCurrency = () => ({
  type: types.REQUEST_SINGLE_CURRENCY,
  isLoading: true
});

export const setCurrency = currencyData => ({
  type: types.SET_CURRENCY,
  currency: currencyData.map(item => item.name)
});

export const requestIntiailCurrencyDetails = currencyDetails => ({
  type: types.REQUEST_CURRENCY_DETAILS,
  currencyDetails
});

export const addToSelectList = data => ({
  type: types.ADD_TO_SELECT_LIST_AFTER_DELETE,
  data
});

export const addBackToTableFromSelect = selectedOption => ({
  type: types.ADD_BACK_TO_TABLE_FROM_SELECT,
  selectedOption
});

export const deleteFromSelectItems = itemToDelete => ({
  type: types.DELETE_FROM_SELECT_LIST,
  itemToDelete
});

export const errors = error => ({
  type: types.ERROR_RECEIVED,
  error
});
