import React from "react";
import FilterSeller from "./FilterSeller";
import FilterCategory from "./FilterCategory";

export default function Filter() {
  return (
    <div>
      <h1>FILTER</h1>

      <FilterCategory />
      <FilterSeller/>
    </div>
  );
}
