import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../Services/useFetch";

export default function Detail() {
  const { id } = useParams();
  const { data: product, loading, error } = useFetch(`products/${id}`);
  const [showPriceHistory, setShowPriceHistory] = useState(false);

  if (error) throw error;
  if (loading) return <h1>loading..</h1>;
  if (!product) return <h1>page not found</h1>;

  const onClickShowPriceHistory = () => setShowPriceHistory(!showPriceHistory);

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
        <button onClick={onClickShowPriceHistory}>
         {showPriceHistory ? "Close": "Show price history"}
        </button>

        {showPriceHistory ? (
          <ul>
            {product.priceHistory.map((priceHistory) => (
              <li key={priceHistory.value}>
                {`price: ${priceHistory.amount} | date: ${priceHistory.date}`}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
