import React from "react";
import useFetch from "../Services/useFetch";


export default function FilterCategory({
  selectedCategoryFilterCallback,
  selectedCategoryParam,
}) {
  const { data: categories, loading, error } = useFetch("categories");

  function handelSelectCategory(e) {
    
    const selectedCategory = [].concat(selectedCategoryParam);
    if (e.target.checked) {
      selectedCategory.push(e.target.value);
      selectedCategoryFilterCallback(selectedCategory);
    } else {
      const newCategoryList = selectedCategoryParam.filter(c=>c!==e.target.value);
      selectedCategoryFilterCallback(newCategoryList);
    }
  }

  const preSelectedCategories = [];

  selectedCategoryParam.forEach((key) => {
    var item = {};
    item["name"] = key;
    preSelectedCategories.push(item);
  });

  if (error) throw error;
  if (loading) return <h1>loading products..</h1>;
  if (categories.length === null) return <h1>products not found</h1>;

  return (
    <>
      <h6 class="text-uppercase mb-3">Categories</h6>

      {categories.map((category) => {
        return (
          <div
            className="custom-control custom-checkbox mb-1"
            key={category.id}
          >
            <input
              className="custom-control-input"
              id={category.id}
              type="checkbox"
              value={category.name}
              onChange={handelSelectCategory}
              defaultChecked={selectedCategoryParam.includes(category.name)}
            ></input>
            <label class="custom-control-label text-small" for={category.id}>
              {category.name}
            </label>
          </div>
        );
      })}
    </>
  );
}

