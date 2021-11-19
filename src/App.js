import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Products from "./Pages/Products";
import Detail from "./Pages/Detail";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header";
import HomePage from "./Pages/HomePage";
import "./css/style.default.css";
import Footer from "./Components/Footer";
import PageNotFound from "./Pages/PageNotFound";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();
function App() {
  return (
    <div className="page-holder">
      <Router>
        <QueryClientProvider client={queryClient}>
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
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
