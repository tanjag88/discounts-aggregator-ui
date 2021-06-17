import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Products from "./Components/Products";
import Detail from "./Components/Detail";

function App() {
  return (
    <div className="content">
      <Router>
        <Switch>
          
          <Route path="/products/:id">
            <Detail />
          </Route>

          <Route path="/products">
            <Products />
          </Route>

          <Route path="/">
            <h1>Home page</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
