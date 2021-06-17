import React from "react";
import Product from "./Product";
import useFetch from '../Services/useFetch';

export default function Products() {
  
  const {data:products, loading, error} = useFetch("products");
  
  if(error) throw error;
  if (loading) return (<h1>loading..</h1>);
  if(products.length === null) return (<h1>page not found</h1>)

  return (
    <div>
      {products.map(function (product) {
        return <Product product={product} />;
      })}
    </div>
  );
}
