import React from "react";
import App from "./components/App";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    {/* add hash router here?  */}
    {/* <HashRouter> */}
    <App />
    {/* </HashRouter> */}
  </React.StrictMode>
);

// this is a test
