import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./stores/store";
import { HashRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>

      <React.StrictMode>
      <Router>
        <App />
        </Router>
      </React.StrictMode>

  </Provider>
);
