import React from "react";
import Product from "./Product";
import useFetch from "../Services/useFetch";
import Paginate from "./Paginate";
import Sort from "./Sort";
import { useContext } from "react";
import FilterCategory from "./FilterCategory";
import FilterSeller from "./FilterSeller";
import PriceRange from "./PriceRange";
import { AllFiltersContext } from "../Contexts/AllFiltersContext";

export default function Products() {
  const { filtersState } = useContext(AllFiltersContext);
  
  const {
    data: products,
    loading,
    error,
    totalPages,
    noOfProducts,
  } = useFetch("products?" + filtersState.url(filtersState));

  if (error) throw error;
  if (loading) return <h1>loading products..</h1>;

  return (
    <>
      <section className="py-5">
        <div className="container p-0">
          <div className="row">
            <div class="col-lg-3 order-2 order-lg-1">
              <h5 className="text-uppercase mb-4">Filters</h5>

              <FilterCategory />

              <FilterSeller />
              <PriceRange />
            </div>

            <div className="col-lg-9 order-1 order-lg-2 mb-5 mb-lg-0">
              <div className="row mb-3 align-items-center">
                <div className="col-lg-6 mb-2 mb-lg-0">
                  <p class="text-small text-muted mb-0">
                    Showing{" "}
                    {(parseInt(filtersState.currentPage.value) - 1) * 6 + 1} –{" "}
                    {noOfProducts < parseInt(filtersState.currentPage.value) * 6
                      ? noOfProducts
                      : parseInt(filtersState.currentPage.value) * 6}{" "}
                    of {noOfProducts} products
                  </p>
                </div>
                <div className="col-lg-6">
                  <ul className="list-inline d-flex align-items-center justify-content-lg-end mb-0">
                    <Sort />
                  </ul>
                </div>
              </div>
              <div className="row">
                {products.length === null || products.length === 0 ? (
                  <h1>products not found</h1>
                ) : (
                  products.map((product) => {
                    return <Product product={product} />;
                  })
                )}
              </div>

              <Paginate totalPages={totalPages} noOfProducts={noOfProducts} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
