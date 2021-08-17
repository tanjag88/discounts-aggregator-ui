import React from "react";
import { useState, useContext } from "react";
import { AllFiltersContext } from "../Contexts/AllFiltersContext";
import {
  Navbar,
  Nav,
  Form,
  NavDropdown,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import getDefaultFiltersState from "../Services/getDefaultFiltersState";

export default function Header() {
  const { filtersState, setFiltersState } = useContext(AllFiltersContext);
  const defaultFiltersState = getDefaultFiltersState();
  const [searchQuery, setSearchQuery] = useState(
    filtersState.searchQuery.value
  );
  const history = useHistory();

  const handleSearchQuery = (e) => {
    e.preventDefault();

    setFiltersState((prevFiltersState) => ({
      ...prevFiltersState,
      searchQuery: {
        ...prevFiltersState.searchQuery,
        value: searchQuery,
      },
    }));

    if (!history.location.pathname.includes("products")) {
      history.push("/products?" + filtersState.url(filtersState));
    }
  };

  return (
    <header className="header bg-white">
      <div className="container px-0 px-lg-3">
        <Navbar className="navbar navbar-expand-lg navbar-light py-3 px-lg-0">
          <Navbar.Brand className="navbar-brand" as={Link} to="/">
            Discounts
          </Navbar.Brand>
          <Navbar.Toggle
            className="navbar-toggler navbar-toggler-right"
            aria-controls="navbarSupportedContent"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          />
          <Navbar.Collapse
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <Nav className="navbar-nav mr-auto">
              <Nav.Link
                className="nav-link -active"
                as={Link}
                to="/"
                activeClassName="active"
              >
                Home
              </Nav.Link>
              <Nav.Link
                className="nav-link"
                as={Link}
                to="/products"
                activeClassName="active"
                onClick={(e) => {
                  setFiltersState(defaultFiltersState);
                }}
              >
                All Products
              </Nav.Link>
              <NavDropdown title="Categories" id="basic-nav-dropdown">
                <NavDropdown.Item
                  as={Link}
                  to="/products?category=furniture"
                  onClick={(e) => {
                    setFiltersState({
                      ...defaultFiltersState,
                      category: {
                        ...defaultFiltersState.category,

                        value: ["furniture"],
                      },
                    });
                  }}
                >
                  Furniture
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/products?category=electronics"
                  onClick={(e) => {
                    setFiltersState({
                      ...defaultFiltersState,
                      category: {
                        ...defaultFiltersState.category,
                        value: ["electronics"],
                      },
                    });
                  }}
                >
                  Electronics
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Sellers" id="basic-nav-dropdown">
                <NavDropdown.Item
                  as={Link}
                  to="/products?seller=Structube"
                  onClick={(e) => {
                    setFiltersState({
                      ...defaultFiltersState,
                      seller: {
                        ...defaultFiltersState.seller,
                        value: ["Structube"],
                      },
                    });
                  }}
                >
                  Structube
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/products?seller=BestBuy"
                  onClick={(e) => {
                    setFiltersState({
                      ...defaultFiltersState,
                      seller: {
                        ...defaultFiltersState.seller,
                        value: ["BestBuy"],
                      },
                    });
                  }}
                >
                  BestBuy
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline onSubmit={handleSearchQuery}>
              <FormControl
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                }}
              />
              <Button
                type="submit"
                variant="btn btn-outline-dark"
                onClick={handleSearchQuery}
              >
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
}
