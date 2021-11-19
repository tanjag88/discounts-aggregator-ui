import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSeller, removeSeller } from "../features/filtersSlice";

export default function FilterSeller() {
  const filtersState = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  function handelSelectSeller(e) {
    const selectedSellers = [].concat(filtersState.seller.value);

    if (e.target.checked) {
      selectedSellers.push(e.target.value);
      dispatch(addSeller(selectedSellers));
    } else {
      dispatch(removeSeller(e.target.value));
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
