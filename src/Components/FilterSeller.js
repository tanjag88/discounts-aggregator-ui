import React from "react";
import { AllFiltersContext } from "../Contexts/AllFiltersContext";
import { useContext } from "react";

export default function FilterSeller() {
  const { filtersState, setFiltersState } = useContext(AllFiltersContext);

  function handelSelectSeller(e) {
    const selectedSeller = [].concat(filtersState.seller.value);

    if (e.target.checked) {
      selectedSeller.push(e.target.value);
      setFiltersState((prevFiltersState) => ({
        ...prevFiltersState,
        seller: { ...prevFiltersState.seller, value: selectedSeller },
        currentPage: { ...prevFiltersState.currentPage, value: 1 },
      }));
    } else {
      const newSellerList = filtersState.seller.value.filter(
        (s) => s !== e.target.value
      );
      setFiltersState((prevFiltersState) => ({
        ...prevFiltersState,
        seller: { ...prevFiltersState.seller, value: newSellerList },
        currentPage: { ...prevFiltersState.currentPage, value: 1 },
      }));
    }
  }

  return (
    <>
      <h6 className="text-uppercase mb-3">Sellers</h6>

      {filtersState.seller.sellers.map((s) => {
        return (
          <div className="custom-control custom-checkbox mb-1" key={s}>
            <input
              className="custom-control-input"
              id={s}
              type="checkbox"
              value={s}
              onChange={handelSelectSeller}
              checked={filtersState.seller.value.includes(s)}
            ></input>
            <label className="custom-control-label text-small" htmlFor={s}>
              {s}
            </label>
          </div>
        );
      })}
    </>
  );
}
