import React from "react";

import useFetch from "../Services/useFetch";


export default function FilterCategory({
  selectedSellerFilterCallback, selectedSellerParam
}) {
  
 
  const { data: sellers, loading, error } = useFetch("sellers");

  

function handelSelectSeller(e){
  
  const selectedSeller = [].concat(selectedSellerParam);
  if(e.target.checked){
    selectedSeller.push(e.target.value);
    selectedSellerFilterCallback(selectedSeller);
  }else{
    const newSellerList = selectedSellerParam.filter(s=>s!==e.target.value);
    selectedSellerFilterCallback(newSellerList);
  }
}


const preSelectedSellers = [];
 
selectedSellerParam.forEach(key => 
    {
      var item = {}
      item["name"] = key
      preSelectedSellers.push(item);
    }
    );

  if (error) throw error;
  if (loading) return <h1>loading products..</h1>;
  if (sellers.length === null) return <h1>products not found</h1>;

  return (
    <>
      <h6 class="text-uppercase mb-3">Sellers</h6>

      {sellers.map((seller) => {
        return (
          <div
            className="custom-control custom-checkbox mb-1"
            key={seller.id}
          >
            <input
              className="custom-control-input"
              id={seller.id}
              type="checkbox"
              value={seller.name}
              onChange={handelSelectSeller}
              defaultChecked={selectedSellerParam.includes(seller.name)}
            ></input>
            <label class="custom-control-label text-small" for={seller.id}>
              {seller.name}
            </label>
          </div>
        );
      })}
    </>
  );
}
