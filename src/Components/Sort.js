import React from "react";
import { DropdownButton, Dropdown} from "react-bootstrap";
import { useState } from "react";

export default function Sort({selectedSortAndOrderCallback}) {
  
  const [buttonTittle, setButtonTittle] = useState("Sort By") 

  function setSortAndOrder(selectedSortAndOrder, button){
      debugger;
      selectedSortAndOrderCallback(selectedSortAndOrder);
      setButtonTittle(button.currentTarget.innerText)
      
  }

  return (
    <DropdownButton
      id="dropdown-item-button"
      title={buttonTittle}
      onSelect={setSortAndOrder}
    >
      <Dropdown.Item as="button" eventKey={"_sort=date&_order=desc"}>
        Newest
      </Dropdown.Item>
      <Dropdown.Item as="button" eventKey={"_sort=price&_order=asc"}>
        Price (low - high)
      </Dropdown.Item>
      <Dropdown.Item as="button" eventKey={"_sort=price&_order=desc"}>
        Price (high -low)
      </Dropdown.Item>
    </DropdownButton>
  );
}
