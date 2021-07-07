import React from "react";
import { DropdownButton, Dropdown} from "react-bootstrap";
import { useState } from "react";

export default function Sort({selectedSortAndOrderCallback, sortAndOrder}) {
  
  const buttonTittleMap = new Map();
  buttonTittleMap.set("&_sort=date&_order=desc", "Newest");
  buttonTittleMap.set("&_sort=price&_order=asc", "Price (low - high)");
  buttonTittleMap.set("&_sort=price&_order=desc", "Price (high -low)");
  buttonTittleMap.set("", "Sort By");



  

  function setSortAndOrder(selectedSortAndOrder, button){
      
      selectedSortAndOrderCallback(selectedSortAndOrder);
      
      
  }
  
  
  return (
    <DropdownButton
      id="dropdown-item-button"
      title={buttonTittleMap.get(sortAndOrder)}
      onSelect={setSortAndOrder}
    >
      <Dropdown.Item as="button" eventKey={"&_sort=date&_order=desc"}>
        Newest
      </Dropdown.Item>
      <Dropdown.Item as="button" eventKey={"&_sort=price&_order=asc"}>
        Price (low - high)
      </Dropdown.Item>
      <Dropdown.Item as="button" eventKey={"&_sort=price&_order=desc"}>
        Price (high -low)
      </Dropdown.Item>
    </DropdownButton>
  );
}
