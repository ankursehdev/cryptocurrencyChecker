import React from "react";
import { connect } from "react-redux";
import { getSingleCurrencyDetails } from "../../actions/actions";
import "./SelectBox.css";

const SelectDropDown = ({
  cryptocurrency,
  isSelectItemsLoading,
  errorOccured,
  dispatch
}) => {
  const handleChange = event => {
    dispatch(getSingleCurrencyDetails(event.target.value));
  };

  if (errorOccured) {
    return <div>`Error Occured please check console - ${errorOccured}`</div>;
  }
  return (
    <div>
      {isSelectItemsLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="selectContainer">
          <select onChange={handleChange} className="selectStyle">
            {cryptocurrency.map((eachItem, index) => (
              <option key={index} value={eachItem}>
                {eachItem}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  cryptocurrency: state.initialCurrencyData.selectItems,
  isSelectItemsLoading: state.initialCurrencyData.selectItemsIsLoading,
  errorOccured: state.initialCurrencyData.selectItemsError
});

export default connect(mapStateToProps)(SelectDropDown);
