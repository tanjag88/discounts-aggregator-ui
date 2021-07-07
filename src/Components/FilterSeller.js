import React from "react";
import { useState } from "react";
import useFetch from "../Services/useFetch";
import { Multiselect } from "multiselect-react-dropdown";

export default function FilterCategory({
  selectedSellerFilterCallback, selectedSellerParam
}) {
  
 
  const { data: sellers, loading, error } = useFetch("sellers");

  const removedSeller = (selectedList, removedItem) => {
    
    selectedSellerFilterCallback(selectedList);
  };

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
    <Multiselect
      placeholder="SELECT SELLER"
      options={sellers}
      selectedValues={preSelectedSellers}
      onSelect={selectedSellerFilterCallback}
      onRemove={removedSeller}
      displayValue="name"
    ></Multiselect>
  );
}
