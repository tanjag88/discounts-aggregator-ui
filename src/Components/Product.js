import React from 'react';


export default function Product({product}){
    const {name, description, price} = product
    return(
        <div>
            <h1>{name}</h1>
            <p>{description}</p>
            <p>{price}</p>
        </div>
    );
}
