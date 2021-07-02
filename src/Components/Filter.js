import React from "react";
import FilterSeller from "./FilterSeller";
import FilterCategory from "./FilterCategory";

export default function Filter({
  selectedCategoryFilterCallback,
  selectedSellerFilterCallback,
}) {
  return (
    <div className="row">
      <div className="col-sm-2">
        <h3>FILTER</h3>

        <FilterCategory
          selectedCategoryFilterCallback={selectedCategoryFilterCallback}
        />
        <FilterSeller
          selectedSellerFilterCallback={selectedSellerFilterCallback}
        />
      </div>
    </div>
  );
}
