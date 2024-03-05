import "@/globals.css";
import ReactDOM from "react-dom/client";
import App from "@/routes/App";
import { ThemeProvider } from "@/components/ThemeProvider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

////////////////일렉트론 컴포넌트/////////////////////
const electron = window.electron;
import TitleBar from "@/electron/TitleBar.tsx";
/////////////////////////////////////////////////////

const router = createBrowserRouter([
  { path: "/", element: <App /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      {typeof electron !== "undefined" && <TitleBar />}
      <RouterProvider router={router} />
  </ThemeProvider>
);
