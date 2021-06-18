import React from "react";
import { useState } from "react";
import useFetch from "../Services/useFetch";
import { Multiselect } from "multiselect-react-dropdown";

export default function FilterCategory({ selectedCategoryFilterCallback }) {
  const [category, setCategory] = useState([]);

  const { data: categories, loading, error } = useFetch("categories");

  const selectedCategory = (selectedList, selectedCategory) => {
    setCategory(selectedList);
    selectedCategoryFilterCallback(selectedList);
  };

  const removedCategory = (selectedList, removedItem) => {
    let newFilterCategory = category.filter((c) => c.id !== removedItem.id);
    setCategory(newFilterCategory);
    selectedCategoryFilterCallback(newFilterCategory);
  };

  if (error) throw error;
  if (loading) return <h1>loading products..</h1>;
  if (categories.length === null) return <h1>products not found</h1>;

  return (
    <Multiselect
      placeholder="SELECT CATEGORY"
      options={categories}
      selectedValues={category}
      onSelect={selectedCategory}
      onRemove={removedCategory}
      displayValue="name"
    ></Multiselect>
  );
}