import React from "react";

export default function Sort({ selectedSortAndOrderCallback, sortAndOrder }) {
  const buttonTittleMap = new Map();
  buttonTittleMap.set("&_sort=date&_order=desc", "Newest");
  buttonTittleMap.set("&_sort=price&_order=asc", "Price (low - high)");
  buttonTittleMap.set("&_sort=price&_order=desc", "Price (high -low)");
  buttonTittleMap.set("", "Sort By");

  function setSortAndOrder(selectedSortAndOrder, button) {
   
    selectedSortAndOrderCallback(selectedSortAndOrder.target.value);  }

  return (
    <li class="list-inline-item">
      <select
        className="selectpicker ml-auto"
        name="sorting"
        data-width="200"
        data-style="bs-select-form-control"
        data-title="Default sorting"
        title={buttonTittleMap.get(sortAndOrder)}
        onChange={setSortAndOrder}
      >
        <option value="default">Default sorting</option>
        <option value={"&_sort=date&_order=desc"}>Newest</option>
        <option value={"&_sort=price&_order=asc"}>Price: Low to High</option>
        <option value={"&_sort=price&_order=desc"}>Price: High to Low</option>
      </select>
    </li>
    
  );
}
