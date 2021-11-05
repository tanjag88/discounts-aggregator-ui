import React from "react";
import { useState, useEffect } from "react";
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

export default function Header() {
  // function putUrlParams(selectedFilters, queryProp) {
  //   const paramUrl =
  //     selectedFilters.length !== 0
  //       ? `&${queryProp}=` + selectedFilters.join(`&${queryProp}=`)
  //       : "";
  //   return paramUrl;
  // }
  // function getUrl(filtersState) {
  //   debugger;
  //   const categoryUrl =
  //     filtersState.category.value.length === 0
  //       ? ""
  //       : putUrlParams(filtersState.category.value, "category");
  //   const sellerUrl =
  //     filtersState.seller.value.length === 0
  //       ? ""
  //       : putUrlParams(filtersState.seller.value, "seller");
  //   const pageUrl =
  //     filtersState.currentPage.value === 1
  //       ? "&_page=1"
  //       : `&_page=${filtersState.currentPage.value}`;

  //   const sortingUrl =
  //     filtersState.sorting.value.length === 0
  //       ? ""
  //       : `&_sort=${filtersState.sorting.value[0]}&_order=${filtersState.sorting.value[1]}`;

  //   const priceRangeUrl = `&price_gte=${parseInt(
  //     filtersState.priceRange.value[0]
  //   )}&price_lte=${parseInt(filtersState.priceRange.value[1])}`;

  //   const searchQueryUrl =
  //     filtersState.searchQuery.value === ""
  //       ? ""
  //       : `&q=${filtersState.searchQuery.value}`;

  //   return (
  //     `&_limit=${filtersState.limit.value}` +
  //     pageUrl +
  //     categoryUrl +
  //     sellerUrl +
  //     sortingUrl +
  //     priceRangeUrl +
  //     searchQueryUrl
  //   );
  // }
  // const { filtersState, setFiltersState } = useContext(AllFiltersContext);
  const filtersState = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  // const [url, setUrl] = useState('');

  // const defaultFiltersState = getDefaultFiltersState();
  const [searchQuery, setSearchQuery] = useState(
    filtersState.searchQuery.value
  );
  const history = useHistory();

  function handleSearchQuery(event) {
    event.preventDefault();
    dispatch(addSearchQuery(searchQuery));

    if (!history.location.pathname.includes("products")) {
      dispatch(removeHomePageSort());
      // history.push("/products?" + filtersState.url(filtersState));
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
              //   setSearchQuery("");
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
                  // setFiltersState(defaultFiltersState);
                  // setSearchQuery("");
                }}
              >
                All Products
              </Nav.Link>
              <NavDropdown title="Categories" id="basic-nav-dropdown">
                <NavDropdown.Item
                  as={Link}
                  to="/products?category=furniture"
                  key={"selectFurniture"}
                  onClick={(e) => {
                    dispatch(setCategoryResetFilters(["furniture"]));

                    // setFiltersState({
                    //   ...defaultFiltersState,
                    //   category: {
                    //     ...defaultFiltersState.category,

                    //     value: ["furniture"],
                    //   },
                    // });
                    // setSearchQuery("");
                  }}
                >
                  Furniture
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/products?category=electronics"
                  onClick={(e) => {
                    dispatch(setCategoryResetFilters(["electronics"]));

                    // setFiltersState({
                    //   ...defaultFiltersState,
                    //   category: {
                    //     ...defaultFiltersState.category,
                    //     value: ["electronics"],
                    //   },
                    // });
                    // setSearchQuery("");
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

                    // setFiltersState({
                    //   ...defaultFiltersState,
                    //   seller: {
                    //     ...defaultFiltersState.seller,
                    //     value: ["Structube"],
                    //   },
                    // });
                    // setSearchQuery("");
                  }}
                >
                  Structube
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/products?seller=BestBuy"
                  onClick={(e) => {
                    dispatch(setSellerResetFilters(["BestBuy"]));

                    // setFiltersState({
                    //   ...defaultFiltersState,
                    //   seller: {
                    //     ...defaultFiltersState.seller,
                    //     value: ["BestBuy"],
                    //   },
                    // });
                    // setSearchQuery("");
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
                  // dispatch(addSearchQuery(event.target.value));
                }}
                // value={searchQuery}
                // onChange={(event) => {
                //   setSearchQuery(event.target.value);
                // }}
              />
              <Button
                type="submit"
                variant="btn btn-outline-dark"
                // onClick={(event) => {
                //   event.preventDefault();
                //   dispatch(addSearchQuery(searchQuery));
                // }}
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
