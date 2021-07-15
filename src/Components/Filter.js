import React from "react";
import FilterSeller from "./FilterSeller";
import FilterCategory from "./FilterCategory";
import PriceRange from "./PriceRange";

export default function Filter({
  selectedCategoryFilterCallback,
  selectedSellerFilterCallback,
  selectedCategoryParam,
  selectedSellerParam,
  priceRangeCallback,
  selectedPriceRange,
}) {
  return (
    <div class="col-lg-3 order-2 order-lg-1">
      <h5 className="text-uppercase mb-4">Filters</h5>
      <FilterCategory
        selectedCategoryFilterCallback={selectedCategoryFilterCallback}
        selectedCategoryParam={selectedCategoryParam}
      />
      <FilterSeller
        selectedSellerFilterCallback={selectedSellerFilterCallback}
        selectedSellerParam={selectedSellerParam}
      />
      <PriceRange
        priceRangeCallback={priceRangeCallback}
        selectedValue={selectedPriceRange}
        
      />
    </div>
  );
}
