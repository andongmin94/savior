import 'regenerator-runtime/runtime';
import React from "react";
import ReactDOM from 'react-dom/client'
import "@/globals.css";
import App from "./App";
import reportWebVitals from "@/reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import logger from "redux-logger";
import rootReducer from "@/reducers/index";
import { applyMiddleware, createStore, compose } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import ScrollToTop from "@/pages/ScrollTop";
//////////////// electron components ////////////////
import TitleBar from "@/electron/TitleBar";
/////////////////////////////////////////////////////

const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware())
    : composeWithDevTools(applyMiddleware(logger));

const store = createStore(rootReducer, undefined, enhancer);

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <ScrollToTop />
      <Provider store={store}>
      {typeof window.electron !== "undefined" && <TitleBar />}
        <App />
      </Provider>
    </BrowserRouter>
  </>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
