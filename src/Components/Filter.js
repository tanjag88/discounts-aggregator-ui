import React from "react";
import FilterSeller from "./FilterSeller";
import FilterCategory from "./FilterCategory";

export default function Filter({
  selectedCategoryFilterCallback,
  selectedSellerFilterCallback,
  selectedCategoryParam,
  selectedSellerParam,
}) {
  return (
    <div className="row">
      <div className="col-sm-2">
        <h3>FILTER</h3>

        <FilterCategory
        selectedCategoryFilterCallback={selectedCategoryFilterCallback}
        selectedCategoryParam ={selectedCategoryParam}
        />
        <FilterSeller
          selectedSellerFilterCallback={selectedSellerFilterCallback}
          selectedSellerParam = {selectedSellerParam}
        />
      </div>
    </div>
  );
}
