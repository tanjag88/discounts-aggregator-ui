import React from "react";
import Product from "./Product";
import useFetch from "../Services/useFetch";
import Filter from "./Filter";
import { useState } from "react";
import Paginate from "./Paginate";
import Sort from "./Sort";
import { CardDeck } from "react-bootstrap";

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
  const[sortAndOrder, setSortAndOrder] = useState("");
  

  const {
    data: products,
    loading,
    error,
    totalPages,
  } = useFetch(
    "products?" + sortAndOrder +
      arrayToQueryString(selectedCategory, "category") +
      arrayToQueryString(selectedSeller, "seller") +
      `&_limit=9&_page=${currentPage}`
  );

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };

  const handleSelectedCategory =(data)=>{
    setSelectedCategory(data);
    setCurrentPage(1);
  };
  const handleSelectedSeller = (data) => {
    setSelectedSeller(data);
    setCurrentPage(1);
  };

  const handleSelectedSortAndOrder = (selectedSortAndOrder) => {
    setSortAndOrder(selectedSortAndOrder)
  };

  if (error) throw error;
  if (loading) return <h1>loading products..</h1>;
  if (products.length === null) return <h1>products not found</h1>;

  const noOfRows = Math.ceil(products.length/3);

  return (
    <>
      <div>
        <Filter
          selectedCategoryFilterCallback={handleSelectedCategory}
          selectedSellerFilterCallback={handleSelectedSeller}
        />
      </div>
      <Sort selectedSortAndOrderCallback={handleSelectedSortAndOrder} />

      <CardDeck>
        {[...Array(noOfRows)].map((x, i) => (
          <div className="row">
            {products.slice(i * 3, i * 3 + 3).map((product) => {
              return <Product product={product} />;
            })}
          </div>
        ))}
      </CardDeck>
      <Paginate totalPages={totalPages} pageChangeCallback={handlePageClick} />
    </>
  );
}
