import React from "react";
import { useParams } from "react-router-dom";
import useFetch from '../Services/useFetch';

export default function Detail() {
  const { id } = useParams();
  const { data: product, loading, error } = useFetch(`products/${id}`);

  if (error) throw error;
  if (loading) return <h1>loading..</h1>;
  if (!product) return <h1>page not found</h1>;
  return (
    <div>
      <div>
        <h1>{product.name}</h1>
        
        <img alt="" src={product.img}></img>
      

        <p>{product.description}</p>
        <p>{product.price}</p>
        <p>{product.seller}</p>
        <p>
          <a href={product.url}>link</a>
        </p>
      </div>
    </div>
  );
}
