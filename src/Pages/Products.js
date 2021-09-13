import React from "react";
import Product from "../Components/Product";
import Paginate from "../Components/Paginate";
import Sort from "../Components/Sort";
import { useContext } from "react";
import FilterCategory from "../Components/FilterCategory";
import FilterSeller from "../Components/FilterSeller";
import PriceRange from "../Components/PriceRange";
import { AllFiltersContext } from "../Contexts/AllFiltersContext";

import { useFetchProducts } from "../Services/fetchData";

export default function Products() {
  const { filtersState } = useContext(AllFiltersContext);

  const result = useFetchProducts(filtersState);
  const data = result.data;

  if (data && data.error)
    return <h1>An error has occurred:{data.error.message}</h1>;

  if (result.isLoading) return <h1>loading products..</h1>;

  const products = data.data;

  return (
    <>
      <section className="py-5" id="productsPage">
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
                    {data.noOfProducts <
                    parseInt(filtersState.currentPage.value) * 6
                      ? data.noOfProducts
                      : parseInt(filtersState.currentPage.value) * 6}{" "}
                    of {data.noOfProducts} products
                  </p>
                </div>
                <div className="col-lg-6">
                  <ul className="list-inline d-flex align-items-center justify-content-lg-end mb-0">
                    <Sort />
                  </ul>
                </div>
              </div>
              <div className="row" id="row-products">
                {products.length === null || products.length === 0 ? (
                  <h1>products not found</h1>
                ) : (
                  products.map((product) => {
                    return <Product product={product} key={product.url} />;
                  })
                )}
              </div>

              <Paginate
                totalPages={data.totalPages}
                noOfProducts={data.noOfProducts}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
