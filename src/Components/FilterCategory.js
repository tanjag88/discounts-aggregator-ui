import React from "react";
import { useContext } from "react";
import { AllFiltersContext } from "../Contexts/AllFiltersContext";


export default function FilterCategory() {
  const { filtersState, setFiltersState } = useContext(AllFiltersContext);
  
  function handelSelectCategory(e) {
    const selectedCategory = [].concat(filtersState.category.value);

    if (e.target.checked) {
      selectedCategory.push(e.target.value);
      setFiltersState((prevFiltersState) => ({
        ...prevFiltersState,
        category: { ...prevFiltersState.category, value: selectedCategory },
        currentPage: { ...prevFiltersState.currentPage, value: 1 },
      }));
    } else {
      const newCategoryList = filtersState.category.value.filter(
        (c) => c !== e.target.value
      );
      
      setFiltersState((prevFiltersState) => ({
        ...prevFiltersState,
        category: { ...prevFiltersState.category, value: newCategoryList },
        currentPage: { ...prevFiltersState.currentPage, value: 1},
      }));
    }
  }

  return (
    <>
      <h6 class="text-uppercase mb-3">Categories</h6>

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
            <label class="custom-control-label text-small" for={c}>
              {c}
            </label>
          </div>
        );
      })}
    </>
  );
}
