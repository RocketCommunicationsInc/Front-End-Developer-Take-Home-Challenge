import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
