import React from "react";
import { useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  NavDropdown,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryResetFilters,
  resetFilters,
  setSellerResetFilters,
  setHomePageSortResetFilters,
  addSearchQuery,
  removeSearchQuery,
  removeHomePageSort,
} from "../features/filtersSlice";
import generateUrl from "../Services/generateUrl";

export default function Header() {
  const filtersState = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  const history = useHistory();

  const [searchQuery, setSearchQuery] = useState(
    filtersState.searchQuery.value
  );

  function handleSearchQuery(event) {
    event.preventDefault();
    dispatch(addSearchQuery(searchQuery));

    if (!history.location.pathname.includes("products")) {
      dispatch(removeHomePageSort());
      history.push({
        search: generateUrl(filtersState),
      });
      history.push(`/products?${generateUrl(filtersState)}`);
    }
  }

  return (
    <header className="header bg-white">
      <div className="container px-0 px-lg-3">
        <Navbar className="navbar navbar-expand-lg navbar-light py-3 px-lg-0">
          <Navbar.Brand
            className="navbar-brand"
            as={Link}
            to="/"
            onClick={(e) => {
              dispatch(setHomePageSortResetFilters(["views.length", "desc"]));
              setSearchQuery("");
            }}
          >
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
                onClick={() => {
                  dispatch(
                    setHomePageSortResetFilters(["views.length", "desc"])
                  );
                  setSearchQuery("");
                }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                className="nav-link"
                as={Link}
                to="/products"
                activeClassName="active"
                onClick={(e) => {
                  dispatch(resetFilters());
                  setSearchQuery("");
                }}
              >
                All Products
              </Nav.Link>
              <NavDropdown title="Categories" id="basic-nav-dropdown">
                <NavDropdown.Item
                  as={Link}
                  to="/products?category=furniture"
                  key={"selectFurniture"}
                  onClick={(event) => {
                    dispatch(setCategoryResetFilters(["furniture"]));
                    setSearchQuery("");
                  }}
                >
                  Furniture
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/products?category=electronics"
                  onClick={(e) => {
                    dispatch(setCategoryResetFilters(["electronics"]));
                    setSearchQuery("");
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
                    dispatch(setSellerResetFilters(["Structube"]));
                    setSearchQuery("");
                  }}
                >
                  Structube
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/products?seller=BestBuy"
                  onClick={(e) => {
                    dispatch(setSellerResetFilters(["BestBuy"]));
                    setSearchQuery("");
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
                  if (event.target.value.length > 2) {
                    dispatch(addSearchQuery(event.target.value));
                  } else {
                    dispatch(removeSearchQuery());
                  }
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
