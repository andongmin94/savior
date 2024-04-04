import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import rootReducer from "@/reducers/index";
import App from "./App";
import ScrollToTop from "@/pages/ScrollTop";
import { initializeDemoSession } from "@/mocks/demoStore";
import "@/globals.css";

/**
 * React tree를 만들기 전에 Mock 세션을 복원해 첫 화면부터 일관된 사용자 상태를 제공한다.
 * Real 모드에서는 아무 상태도 만들지 않고 실제 인증·API 흐름을 그대로 사용한다.
 */
initializeDemoSession();

const store = createStore(rootReducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <HashRouter>
      <ScrollToTop />
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </>
);
