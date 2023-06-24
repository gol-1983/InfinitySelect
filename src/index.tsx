import React from "react";
import ReactDOM from "react-dom/client";
import {
  HashRouter,
   BrowserRouter} from 'react-router-dom';

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

import {store} from "./redux/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
    <HashRouter basename="/infinitySelect">
    <Provider store={store}>
      <App />
    </Provider>
    </HashRouter>
);

reportWebVitals();
