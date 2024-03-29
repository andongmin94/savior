import 'regenerator-runtime/runtime';
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore, compose } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import logger from "redux-logger";

import rootReducer from "@/reducers/index";
import App from "./App";
import reportWebVitals from "@/reportWebVitals";
import ScrollToTop from "@/pages/ScrollTop";
//////////////// electron components ////////////////
import TitleBar from "@/components/TitleBar";
/////////////////////////////////////////////////////
import "@/globals.css";

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
        <TitleBar />
        <App />
      </Provider>
    </BrowserRouter>
  </>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
