import React from "react";
import { useState } from "react";
import useFetch from "../Services/useFetch";
import { Multiselect } from "multiselect-react-dropdown";

export default function FilterCategory({
  selectedSellerFilterCallback,
}) {
  const [seller, setSeller] = useState([]);

  const { data: sellers, loading, error } = useFetch("sellers");

  const selectedSeller = (selectedList, selectedSeller) => {
    setSeller(selectedList);
    selectedSellerFilterCallback(selectedList);
  };

  const removedSeller = (selectedList, removedItem) => {
    let newFilterSeller = seller.filter((c) => c.id !== removedItem.id);
    setSeller(newFilterSeller);
    selectedSellerFilterCallback(newFilterSeller);
  };

  if (error) throw error;
  if (loading) return <h1>loading products..</h1>;
  if (sellers.length === null) return <h1>products not found</h1>;

  return (
    <Multiselect
      placeholder="SELECT SELLER"
      options={sellers}
      selectedValues={seller}
      onSelect={selectedSeller}
      onRemove={removedSeller}
      displayValue="name"
    ></Multiselect>
  );
}
