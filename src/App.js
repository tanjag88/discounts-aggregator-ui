import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Products from "./Components/Products";

function App() {
  return (
    <div className="content">
      <Router>
        <Route path="/">
          <h1>Discounts</h1>
        </Route>
        <Route path="/products">
          <Products/>
        </Route>
      </Router>
    </div>
  );
}

export default App;
