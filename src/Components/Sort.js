import React from "react";
import { useContext } from "react";

import { AllFiltersContext } from "../Contexts/AllFiltersContext";

export default function Sort() {
  const { filtersState, setFiltersState } = useContext(AllFiltersContext);
  const buttonTittleMap = new Map();buttonTittleMap.set("", "Sort By");
  buttonTittleMap.set(["date", "desc"], "Newest");
  buttonTittleMap.set(["price", "asc"], "Price (low - high)");
  buttonTittleMap.set(["price", "desc"], "Price (high -low)");

  function setSortAndOrder(selectedSortAndOrder) {
    const data = [
      selectedSortAndOrder.target.value.split(",")[0],
      selectedSortAndOrder.target.value.split(",")[1],
    ];

    setFiltersState((prevFiltersState) => ({
      ...prevFiltersState,
      sorting: {
        ...prevFiltersState.sorting,
        value: data === null ? "" : data,
      },
    }));
  }

  const isSelected = (option) =>
    (option[0] === filtersState.sorting.value[0]) &
    (option[1] === filtersState.sorting.value[1])
      ? true
      : false;

  return (
    <li class="list-inline-item">
      <select
        className="selectpicker ml-auto"
        name="sorting"
        data-width="200"
        data-style="bs-select-form-control"
        data-title="Default sorting"
        title={buttonTittleMap.get(filtersState.sorting.value)}
        onChange={setSortAndOrder}
      >
        {[...buttonTittleMap].map((v) => {
          return (
            <option value={v[0]} selected={isSelected(v[0])}>
              {v[1]}{" "}
            </option>
          );
        })}
      </select>
    </li>
  );
}
