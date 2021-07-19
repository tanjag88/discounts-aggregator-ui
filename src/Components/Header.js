import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  Navbar,
  Nav,
  Form,
  NavDropdown,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  const history = useHistory();
  

  const handleSearchQuery = (e) => {
    e.preventDefault();
    if (history.location.pathname === "/") {
      
      history.push({
        pathname:'/products',
        search: `?q=${searchQuery}`,
      });
    } else {
      history.push({
        search: `q=${searchQuery}`,
      });
    }
  };
  
  
  return (
    <header className="header bg-white">
      <div class="container px-0 px-lg-3">
        <Navbar className="navbar navbar-expand-lg navbar-light py-3 px-lg-0">
          <Navbar.Brand className="navbar-brand" href="/">
            Discounts
          </Navbar.Brand>
          <Navbar.Toggle
            className="navbar-toggler navbar-toggler-right"
            aria-controls="navbarSupportedContent"
            type="button"
            data-Toggle="collapse"
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
              >
                All Products
              </Nav.Link>
              <NavDropdown title="Categories" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/products?category=furniture">
                  Furniture
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/products?category=electronics">
                  Electronics
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Sellers" id="basic-nav-dropdown">
                <NavDropdown.Item href="/products?seller=Structube">
                  Structube
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">BestBuy</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline onSubmit={handleSearchQuery}>
              <FormControl
                type="text"
                placeholder="Search"
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
