import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Products from "./Components/Products";
import Detail from "./Components/Detail";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header";
import HomePage from "./Components/HomePage";
import "./css/style.default.css";


function App() {
  return (
    <div className="page-holder">
      <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/products/:id">
              <Detail />
            </Route>
            <Route path="/products">
              <Products />
            </Route>

            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
