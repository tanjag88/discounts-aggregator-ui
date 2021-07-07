import React from "react";
import Product from "./Product";
import useFetch from "../Services/useFetch";
import Filter from "./Filter";
import { useState } from "react";
import Paginate from "./Paginate";
import Sort from "./Sort";
import { CardDeck } from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";

export default function Products() {
  const history = useHistory();
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const params = useQuery();
  // const { query } = this.props.location;

  const category = params.getAll("category");
  const categoryUrl =
    category.length !== 0
      ? "&category=" + params.getAll("category").join("&category=")
      : "";

  const seller = params.getAll("seller");
  const sellerUrl =
    seller.length !== 0
      ? "&seller=" + params.getAll("seller").join("&seller=")
      : "";
  const limitUrl = "&_limit=3";
  
  
  const currentPageParam = params.get("_page");
  const currentPage = currentPageParam === null ? 1: currentPageParam
  const pageUrl = currentPage === null ? "&_page=1" : `&_page=${currentPage}`;

  const sort = params.get("_sort");
  const order = params.get("_order");

  const sortAndOrder = (sort === null & order === null)? "":`&_sort=${sort}&_order=${order}`;

  const searchQueryParm = params.get("q");
  const searchQueryUrl =
    searchQueryParm === null ? "" : `&q=${searchQueryParm}`;
 
  const {
    data: products,
    loading,
    error,
    totalPages,
  } = useFetch(
    "products?" + sortAndOrder + categoryUrl + sellerUrl + limitUrl + pageUrl + searchQueryUrl
  );

  const handlePageClick = (data) => {
   
    history.push({
      search:
        limitUrl +
        `&_page=${data.selected + 1}` +
        categoryUrl +
        sellerUrl +
        sortAndOrder +
        searchQueryUrl,
    });
  };

  const handleSelectedCategory = (data) => {
    
    var s = "";
    for (var i = 0; i < data.length; i++) {
      s += "&category=" + data[i].name;
    }
    history.push({
      search:
        limitUrl + "&_page=1" + s + sellerUrl + sortAndOrder + searchQueryUrl,
    });
  };
  const handleSelectedSeller = (data) => {
    
    var s = "";
    for (var i = 0; i < data.length; i++) {
      s += "&seller=" + data[i].name;
    }
    history.push({
      search:
        limitUrl + "&_page=1" + s + categoryUrl + sortAndOrder + searchQueryUrl,
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
        searchQueryUrl,
    });
  };

  if (error) throw error;
  if (loading) return <h1>loading products..</h1>;
  if (products.length === null || products.length === 0) return <h1>products not found</h1>;

  const noOfRows = Math.ceil(products.length / 3);

  return (
    <>
      <div>
        <Filter
          selectedCategoryFilterCallback={handleSelectedCategory}
          selectedSellerFilterCallback={handleSelectedSeller}
          selectedCategoryParam={category}
          selectedSellerParam={seller}
        />
      </div>
      <Sort selectedSortAndOrderCallback={handleSelectedSortAndOrder} sortAndOrder={sortAndOrder}/>

      <CardDeck>
        {[...Array(noOfRows)].map((x, i) => (
          <div className="row">
            {products.slice(i * 3, i * 3 + 3).map((product) => {
              return <Product product={product} />;
            })}
          </div>
        ))}
      </CardDeck>
      <Paginate
        totalPages={totalPages}
        pageChangeCallback={handlePageClick}
        currentPage={parseInt(currentPage) - 1}
      />
    </>
  );
}
