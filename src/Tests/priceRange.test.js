import React from "react";
import { mount, configure } from "enzyme";
import PriceRange from "../Components/PriceRange";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import "@testing-library/jest-dom";
import { AllFiltersContext } from "../Contexts/AllFiltersContext";

configure({ adapter: new Adapter() });

function mountTest(filtersState, setFiltersState) {
  return mount(
    <AllFiltersContext.Provider
      value={{
        filtersState,
        setFiltersState,
      }}
    >
      <PriceRange />
    </AllFiltersContext.Provider>
  );
}

test("if price range have some value - price range slider to show proper value", () => {
  const state = {
    priceRange: {
      value: [1001,5000],
    },
  };
  const wrapper = mountTest(state, () => {});

  const priceRangeSlider = wrapper.find('input');
 
  expect(priceRangeSlider.props().value).toEqual('1001,5000');
});

test("if price range have default value - price range slider to show  value from 0 to 10000", () => {
  const state = {
    priceRange: {
      value: [0, 10000],
    },
  };
  const wrapper = mountTest(state, () => {});

  const priceRangeSlider = wrapper.find("input");

  expect(priceRangeSlider.props().value).toEqual("0,10000");
});