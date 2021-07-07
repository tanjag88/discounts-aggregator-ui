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
    history.push({
      search: `q=${searchQuery}`,
    });
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Discounts</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/products">
            All Products
          </Nav.Link>
          <NavDropdown title="Categories" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/products?category=furniture">
              Furniture
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/products?category=lap-tops">
              Lap-tops
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
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
            className="mr-sm-2"
            onChange={(event) => {
              setSearchQuery(event.target.value);
            }}
          />
          <Button variant="outline-success" onClick={handleSearchQuery}>
            Search
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
