import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // <-- certifique-se que o caminho está certo


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
