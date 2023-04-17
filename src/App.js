import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { BrowserRouter } from "react-router-dom";
import IndexRoute from "./Routes/IndexRoute";

function App() {
  return (
    <BrowserRouter>
      <IndexRoute />
    </BrowserRouter>
  );
}

export default App;
