import React from "react";
import ReactDOM from "react-dom";
// import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Content from "./container/Content";
// import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  // <provider>
  // <BrowserRouter>
  <>
    <Content />
    <ToastContainer />
  </>
  // </BrowserRouter>
  ,
  // </provider>
  document.getElementById("root")
);
