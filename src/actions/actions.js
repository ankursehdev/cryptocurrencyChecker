import {
  BASE_API_URL,
  NUMBER_OF_ITEM_IN_TABLE,
  NUMBER_OF_ITEM_IN_SELECT
} from "../constants/StringConstants";

import axios from "axios";

import {
  setCurrency,
  requestIntiailCurrencyDetails,
  addBackToTableFromSelect,
  deleteFromSelectItems,
  errors,
  requestSingleCurrency
} from "./";

/** FETCH initial currency */
export const fetchCurrency = () => {
  return function(dispatch) {
    return axios(`${BASE_API_URL}/map`)
      .then(response => response.data)
      .then(currency => {
        dispatch(
          setCurrency(
            currency.data.slice(
              NUMBER_OF_ITEM_IN_TABLE,
              NUMBER_OF_ITEM_IN_SELECT
            )
          )
        );
        dispatch(getCurrencyDetails(currency.data));
      })
      .catch(function(error) {
        console.log(error);
        dispatch(errors(error));
      });
  };
};

/** Get all currency detail for Table, Show 5 at first and get details for them */
export const getCurrencyDetails = currencyData => {
  let params = currencyData
    .slice(0, NUMBER_OF_ITEM_IN_TABLE)
    .map(item => item.slug)
    .toString();

  return function(dispatch) {
    return axios
      .get(`${BASE_API_URL}/quotes`, {
        params: {
          slug: params
        }
      })
      .then(response => response.data)
      .then(currencyDetails => {
        dispatch(
          requestIntiailCurrencyDetails(Object.values(currencyDetails.data))
        );
      })
      .catch(function(error) {
        console.log(error);
        dispatch(errors(error));
      });
  };
};

/** When selecting from Select Drop down, get the detail from API and add to table and Delete from selectItems */
export const getSingleCurrencyDetails = nameOfCurrency => {
  return function(dispatch) {
    dispatch(requestSingleCurrency());
    return axios
      .get(`${BASE_API_URL}/quotes`, {
        params: {
          slug: nameOfCurrency.toLowerCase()
        }
      })
      .then(response => response.data)
      .then(currencyDetails => {
        dispatch(
          addBackToTableFromSelect(Object.values(currencyDetails.data)[0])
        );
        dispatch(deleteFromSelectItems(nameOfCurrency));
      })
      .catch(function(error) {
        console.log(error);
        dispatch(errors(error));
      });
  };
};
