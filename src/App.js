import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Products from "./Components/Products";
import Detail from "./Components/Detail";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header";
import HomePage from "./Components/HomePage";
import "./css/style.default.css";
import Footer from "./Components/Footer";
import PageNotFound from "./Components/PageNotFound";
import { AllFiltersProvider } from "./Contexts/AllFiltersContext";
import {UserContextProvider} from './Contexts/UserContext';

function App() {
  return (
    <div className="page-holder">
      <Router>
        <UserContextProvider>
          <AllFiltersProvider>
            <Header />
            <div className="container">
              <Switch>
                <Route exact path="/products/:id">
                  <Detail />
                </Route>
                <Route exact path="/products">
                  <Products />
                </Route>
                <Route exact path="/">
                  <HomePage />
                </Route>
                <Route>
                  <PageNotFound />
                </Route>
              </Switch>
            </div>
          </AllFiltersProvider>
        </UserContextProvider>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
