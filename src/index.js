import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./main/store";
import App from "./main/app";
import { BrowserRouter as Router } from "react-router-dom";

import "./assets/less/index.css";

render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
