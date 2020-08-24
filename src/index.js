import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import "./rem";
import REM from "./rem";
window.onload = () => {
  REM();
};
window.onresize = () => {
  REM();
};
ReactDOM.render(<App />, document.getElementById("root"));
