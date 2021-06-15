import React from "react";
import Product from "./Product";

export default function Products() {
  const products = [
    {
      id: 1,
      price: 100,
      currency: "CA",
      name: "sofa",
      description: "sofa sofa sofa",
      key: 123,
      active: true,
      url: "",
      img: "",
      category: "furniture",
      seller: "Structube",
    },
    {
      id: 2,
      price: 1000,
      currency: "CA",
      name: "lap-top",
      description: "apple lap-top",
      key: 123,
      active: true,
      url: "",
      img: "",
      category: "lap-tops",
      seller: "BestBuy",
    },
  ];

  return (
    <div>
      {products.map(function (product) {
        return <Product product={product} />;
      })}
    </div>
  );
}
