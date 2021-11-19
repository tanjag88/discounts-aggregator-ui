import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCategory, removeCategory } from "../features/filtersSlice";

export default function FilterCategory() {
  const filtersState = useSelector((state) => state.filters);

  const dispatch = useDispatch();

  function handelSelectCategory(e) {
    const selectedCategories = [].concat(filtersState.category.value);

    if (e.target.checked) {
      selectedCategories.push(e.target.value);
      dispatch(addCategory(selectedCategories));
    } else {
      dispatch(removeCategory(e.target.value));
    }
  }

  return (
    <>
      <h6 className="text-uppercase mb-3">Categories</h6>

      {filtersState.category.categories.map((c) => {
        return (
          <div className="custom-control custom-checkbox mb-1" key={c}>
            <input
              className="custom-control-input"
              id={c}
              type="checkbox"
              value={c}
              onChange={handelSelectCategory}
              checked={filtersState.category.value.includes(c)}
            ></input>
            <label className="custom-control-label text-small" htmlFor={c}>
              {c}
            </label>
          </div>
        );
      })}
    </>
  );
}
