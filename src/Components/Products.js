import React from "react";
import Product from "./Product";
import useFetch from "../Services/useFetch";
import Filter from "./Filter";

import Paginate from "./Paginate";
import Sort from "./Sort";

import { useLocation, useHistory } from "react-router-dom";


export default function Products() {
  const history = useHistory();
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const params = useQuery();
  // const { query } = this.props.location;
  const category = params.getAll("category");
  const seller = params.getAll("seller");

  function getUrlParams(queryStringParams, queryProp) {
    const paramUrl =
      queryStringParams.length !== 0
        ? `&${queryProp}=` + queryStringParams.join(`&${queryProp}=`)
        : "";
    return paramUrl;
  }

  const categoryUrl = getUrlParams(category, "category");
  const sellerUrl = getUrlParams(seller, "seller");
  const limitUrl = "&_limit=6";

  const currentPageParam = params.get("_page");
  const currentPage = currentPageParam === null ? 1 : currentPageParam;
  const pageUrl = currentPage === null ? "&_page=1" : `&_page=${currentPage}`;

  const sort = params.get("_sort");
  const order = params.get("_order");

  const sortAndOrder =
    (sort === null) & (order === null) ? "" : `&_sort=${sort}&_order=${order}`;

  const searchQueryParm = params.get("q");
  const priceFrom = params.get("price_gte");
  const priceTo = params.get("price_lte");
  const priceFromUrl = priceFrom === null ? "" : `&price_gte=${priceFrom}`;
  const priceToUrl = priceTo === null ? "" : `&price_lte=${priceTo}`;

  const priceFromInt = priceFrom === null ? 0 : parseInt(priceFrom);
  const priceToInt = priceTo === null ? 10000 : parseInt(priceTo);

  const searchQueryUrl =
    searchQueryParm === null ? "" : `&q=${searchQueryParm}`;

  const {
    data: products,
    loading,
    error,
    totalPages,
    noOfProducts,
  } = useFetch(
    "products?" +
      sortAndOrder +
      categoryUrl +
      sellerUrl +
      limitUrl +
      pageUrl +
      priceFromUrl +
      priceToUrl +
      searchQueryUrl
  );

  const handlePageClick = (data) => {
    history.push({
      search:
        limitUrl +
        `&_page=${data.selected + 1}` +
        categoryUrl +
        sellerUrl +
        sortAndOrder +
        priceFromUrl +
        priceToUrl +
        searchQueryUrl,
    });
  };

  const handleSelectedCategory = (data) => {
    var s = "";
    for (var i = 0; i < data.length; i++) {
      s += "&category=" + data[i];
    }
    history.push({
      search:
        limitUrl +
        "&_page=1" +
        s +
        sellerUrl +
        sortAndOrder +
        priceFromUrl +
        priceToUrl +
        searchQueryUrl,
    });
  };
  const handleSelectedSeller = (data) => {
    var s = "";
    for (var i = 0; i < data.length; i++) {
      s += "&seller=" + data[i];
    }
    history.push({
      search:
        limitUrl +
        "&_page=1" +
        s +
        categoryUrl +
        sortAndOrder +
        priceFromUrl +
        priceToUrl +
        searchQueryUrl,
    });
  };

  const handleSelectedSortAndOrder = (selectedSortAndOrder) => {
    history.push({
      search:
        limitUrl +
        "&_page=1" +
        categoryUrl +
        sellerUrl +
        selectedSortAndOrder +
        priceFromUrl +
        priceToUrl +
        searchQueryUrl,
    });
  };

  const handlePriceRange = (priceRange) => {
    
    
    history.push({search:
      
        limitUrl +
        "&_page=1" +
        categoryUrl +
        sellerUrl +
        sortAndOrder +
        priceRange +
        searchQueryUrl,
    });

    
  };


  

  if (error) throw error;
  if (loading) return <h1>loading products..</h1>;
 

  return (
    <>
      <section className="py-5">
        <div className="container p-0">
          <div className="row">
            
            <Filter
              selectedCategoryFilterCallback={handleSelectedCategory}
              selectedSellerFilterCallback={handleSelectedSeller}
              selectedCategoryParam={category}
              selectedSellerParam={seller}
              priceRangeCallback={handlePriceRange}
              selectedPriceRange={[priceFromInt, priceToInt]}
            />

            <div className="col-lg-9 order-1 order-lg-2 mb-5 mb-lg-0">
              <div className="row mb-3 align-items-center">
                <div className="col-lg-6 mb-2 mb-lg-0">
                  <p class="text-small text-muted mb-0">
                    Showing {(parseInt(currentPage) - 1) * 6 + 1} – {" "}
                    {noOfProducts < parseInt(currentPage) * 6
                      ? noOfProducts
                      : parseInt(currentPage) * 6}{" "}
                    of {noOfProducts} products
                  </p>
                </div>
                <div className="col-lg-6">
                  <ul className="list-inline d-flex align-items-center justify-content-lg-end mb-0">
                    <Sort
                      selectedSortAndOrderCallback={handleSelectedSortAndOrder}
                      sortAndOrder={sortAndOrder}
                    />
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

              <Paginate
                totalPages={totalPages}
                pageChangeCallback={handlePageClick}
                currentPage={parseInt(currentPage) - 1}
                noOfProducts={noOfProducts}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
