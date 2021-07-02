import React from "react";
import { DropdownButton, Dropdown} from "react-bootstrap";

export default function Sort() {
  return (
    <DropdownButton id="dropdown-item-button" title="Sort By">
      <Dropdown.Item as="button">Newest</Dropdown.Item>
      <Dropdown.Item as="button">Price (low - high)</Dropdown.Item>
      <Dropdown.Item as="button">Price (high -low)</Dropdown.Item>
    </DropdownButton>
  );
}
