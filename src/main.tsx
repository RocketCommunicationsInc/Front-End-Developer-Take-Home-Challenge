import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Dashboard from "./js/components/Dashboard/Dashboard";

import {
  applyPolyfills,
  defineCustomElements,
} from "@astrouxds/astro-web-components/loader";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Dashboard />
  </StrictMode>
);

applyPolyfills().then(() => {
  defineCustomElements();
});
