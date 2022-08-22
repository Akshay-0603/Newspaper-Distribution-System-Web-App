import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./redux/reducer";
import { DarkModeContextProvider } from "./context/darkModeContext";
const store = createStore(reducer);

ReactDOM.render(
  <BrowserRouter>
    <DarkModeContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </DarkModeContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
