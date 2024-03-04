import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from './App.tsx'
import './globals.css'
////////////////일렉트론 컴포넌트/////////////////////
const electron = window.electron;
import TitleBar from "@/electron/TitleBar.tsx";
/////////////////////////////////////////////////////

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  {typeof electron !== "undefined" && <TitleBar />}
    <App />
  </React.StrictMode>,
)
