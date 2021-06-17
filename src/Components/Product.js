import React from 'react';
import { Link } from "react-router-dom";





export default function Product({product}){
    const {name, description, price, img,id } = product;
    
    return (
      <div key={id}>
        <h1>{name}</h1>
        <Link to={`/products/${id}`}>
          <img alt="" src={img}></img>
        </Link>

        <p>{description}</p>
        <p>{price}</p>
      </div>
    );
}
