import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Products from "./Components/Products";
import Detail from "./Components/Detail";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header";

function App() {
  return (
    <div>
      <Router>
        <Header />

        <Switch>
          <Route path="/products/:id">
            <Detail />
          </Route>
          <Route path="/products">
            <Products />
          </Route>

          <Route path="/"></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
