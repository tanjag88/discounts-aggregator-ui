import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortAndOrder } from "../features/filtersSlice";

export default function Sort() {
  const filtersState = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const buttonTittleMap = new Map();
  buttonTittleMap.set([], "Sort By");
  buttonTittleMap.set(["date", "desc"], "Newest");
  buttonTittleMap.set(["price", "asc"], "Price (low - high)");
  buttonTittleMap.set(["price", "desc"], "Price (high -low)");

  function putSortAndOrder(selectedSortAndOrder) {
    const data =
      selectedSortAndOrder.target.value === ""
        ? []
        : [
            selectedSortAndOrder.target.value.split(",")[0],
            selectedSortAndOrder.target.value.split(",")[1],
          ];

    dispatch(setSortAndOrder(data));
  }

  const isSelected = (option) =>
    (option[0] === filtersState.sorting.value[0]) &
    (option[1] === filtersState.sorting.value[1])
      ? true
      : false;

  return (
    <li className="list-inline-item">
      <select
        className="selectpicker ml-auto"
        name="sorting"
        data-width="200"
        data-style="bs-select-form-control"
        data-title="Default sorting"
        title={buttonTittleMap.get(filtersState.sorting.value)}
        onChange={putSortAndOrder}
      >
        {[...buttonTittleMap].map((v) => {
          return (
            <option value={v[0]} key={v[0]} selected={isSelected(v[0])}>
              {v[1]}{" "}
            </option>
          );
        })}
      </select>
    </li>
  );
}
