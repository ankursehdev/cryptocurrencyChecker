import React from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";

import { addToSelectList } from "../../actions";

const TableView = ({
  currencyDetails,
  isTableItemLoading,
  errorOccured,
  isSingleItemLoading,
  dispatch
}) => {
  let currencyDetailsArr = Object.values(currencyDetails).map(
    eachCurrencyItem => {
      let usdPrice = parseFloat(eachCurrencyItem.quote.USD.price).toFixed(2);
      eachCurrencyItem.usdPrice = usdPrice;
      return eachCurrencyItem;
    }
  );

  if (errorOccured) {
    return <div>`Error Occured please check console - ${errorOccured}`</div>;
  }
  return (
    <div>
      {isTableItemLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {isSingleItemLoading && <div>Loading item...</div>}
          <MaterialTable
            title="Crypto Currency Checker"
            columns={[
              { title: "Name", field: "name" },
              { title: "Symbol", field: "symbol" },
              { title: "CMC Rank", field: "cmc_rank", type: "numeric" },
              {
                title: "Price $ USD",
                field: "usdPrice"
              }
            ]}
            data={currencyDetailsArr}
            actions={[
              {
                icon: "delete",
                tooltip: "Delete",
                disabled: currencyDetailsArr.length <= 1,
                onClick: (event, rowData) =>
                  dispatch(addToSelectList(rowData.name))
              }
            ]}
            options={{
              actionsColumnIndex: -1,
              pageSize: 10
            }}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  currencyDetails: state.initialCurrencyData.tableItems,
  isTableItemLoading: state.initialCurrencyData.tableItemsIsLoding,
  errorOccured: state.initialCurrencyData.tableItemsError,
  isSingleItemLoading: state.initialCurrencyData.isSingleItemLoading
});

export default connect(mapStateToProps)(TableView);
