import React from "react";
import Product from "./Product";
import useFetch from "../Services/useFetch";
import Filter from "./Filter";
import { useState } from "react";
import Paginate from "./Paginate";

export default function Products() {
  function arrayToQueryString(array, filter) {
    if (array && array.length > 0) {
      return (
        `&${filter}=` +
        array
          .map(function (i) {
            return i.name;
          })
          .join(`&${filter}=`)
      );
    }

    return "";
  }

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: products,
    loading,
    error,
    totalPages,
  } = useFetch(
    "products?" +
      arrayToQueryString(selectedCategory, "category") +
      arrayToQueryString(selectedSeller, "seller") +
      `_limit=2&_page=${currentPage}`
  );

 const  handlePageClick = (data) => {
    setCurrentPage(data.selected+1);
  };
  

  if (error) throw error;
  if (loading) return <h1>loading products..</h1>;
  if (products.length === null) return <h1>products not found</h1>;

  return (
    <>
      <div>
        <Filter
          selectedCategoryFilterCallback={setSelectedCategory}
          selectedSellerFilterCallback={setSelectedSeller}
        />
      </div>
      <div>
        {products.map(function (product) {
          return <Product product={product} />;
        })}
      </div>
      <Paginate totalPages={totalPages} pageChangeCallback={handlePageClick} />
    </>
  );
}
