import React from "react";
import FilterSeller from "./FilterSeller";
import FilterCategory from "./FilterCategory";

export default function Filter({
  selectedCategoryFilterCallback,
  selectedSellerFilterCallback,
}) {
  return (
    <div>
      <h1>FILTER</h1>

      <FilterCategory
        selectedCategoryFilterCallback={selectedCategoryFilterCallback}
      />
      <FilterSeller
        selectedSellerFilterCallback={selectedSellerFilterCallback}
      />
    </div>
  );
}
