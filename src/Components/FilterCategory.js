import React from "react";
import { useContext } from "react";
import { AllFiltersContext } from "../Contexts/AllFiltersContext";
import { useSelector, useDispatch } from "react-redux";
import { addCategory, removeCategory } from "../features/filtersSlice";

export default function FilterCategory() {
  // const { filtersState, setFiltersState } = useContext(AllFiltersContext);
 const filtersState = useSelector((state) => state.filters);
 const dispatch = useDispatch();
  function handelSelectCategory(e) {
    const selectedCategories = [].concat(filtersState.category.value);

    if (e.target.checked) {
      selectedCategories.push(e.target.value);
      dispatch(addCategory(selectedCategories))
      // setFiltersState((prevFiltersState) => ({
      //   ...prevFiltersState,
      //   category: { ...prevFiltersState.category, value: selectedCategory },
      //   currentPage: { ...prevFiltersState.currentPage, value: 1 },
      // }));
    } else {
      // const newCategoryList = filtersState.category.value.filter(
      //   (c) => c !== e.target.value
      // );
      dispatch(removeCategory(e.target.value));

      // setFiltersState((prevFiltersState) => ({
      //   ...prevFiltersState,
      //   category: { ...prevFiltersState.category, value: newCategoryList },
      //   currentPage: { ...prevFiltersState.currentPage, value: 1 },
      // }));
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
