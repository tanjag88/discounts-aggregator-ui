import React from "react";
import Product from "./Product";
import useFetch from "../Services/useFetch";
import Filter from "./Filter";

export default function Products() {
  
  const { data: products, loading, error } = useFetch("products");

  if (error) throw error;
  if (loading) return <h1>loading products..</h1>;
  if (products.length === null) return <h1>products not found</h1>;

  return (
    <>
    <div>
      <Filter/>
    </div>
    <div>
      
      {products.map(function (product) {
        return <Product product={product} />;
      })}
    </div>
    </>
  );
}
