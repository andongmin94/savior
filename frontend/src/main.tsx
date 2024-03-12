import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "@/globals.css";
//////////////// electron components ////////////////
import TitleBar from "@/electron/TitleBar";
/////////////////////////////////////////////////////

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    {typeof window.electron !== "undefined" && <TitleBar />}
    <App />
  </>,
)
