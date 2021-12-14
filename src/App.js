import './App.css';
import {applyMiddleware, combineReducers, compose, createStore} from "@reduxjs/toolkit";
import provisionDropdown from "./store/reducers/dashboardDropdowns/provisionDropdown";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import systemDropdown from "./store/reducers/dashboardDropdowns/systemDropdown";
import methodDropdown from "./store/reducers/dashboardDropdowns/methodDropdown";
import sheets from "./store/reducers/sheets";
import Dashboard from "./views/dashboard";

const rootReducer = combineReducers({
    provisionDropdown: provisionDropdown,
    systemDropdown: systemDropdown,
    methodDropdown: methodDropdown,
    sheets: sheets
});

const store = createStore(
    rootReducer, (
        compose(
            applyMiddleware(thunk),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    )
)

function App() {
      return (
          <Provider store={store}>
              <Dashboard/>
          </Provider>
      );
}

export default App;
