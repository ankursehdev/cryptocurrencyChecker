import React from "react";
import "./App.css";
import TableView from "./components/Table";
import SelectDropDown from "./components/SelectBox";

import store from "./store";
import { Provider } from "react-redux";

import { fetchCurrency } from "./actions/actions";

store.dispatch(fetchCurrency());

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="table-view">
          <SelectDropDown />
          <TableView />
        </div>
      </div>
    </Provider>
  );
}

export default App;
