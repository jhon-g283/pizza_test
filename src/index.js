import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

console.log("clientWidth:" + document.body.clientWidth);
console.log("offsetWidth:" + document.body.offsetWidth); //   var b = document.body.offsetWidth;

console.log("clientHeight:" + document.body.clientHeight);
console.log("offsetHeight:" + document.body.offsetHeight);
console.log("window.innerHeight:" + window.innerHeight);
console.log("window.innerWidth:" + window.innerWidth);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
