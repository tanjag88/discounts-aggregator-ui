import React from "react";
import { mount, configure } from "enzyme";
import FilterSeller from "../Components/FilterSeller";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import "@testing-library/jest-dom";
import { AllFiltersContext } from "../Contexts/AllFiltersContext";

configure({ adapter: new Adapter() });

test("if seller value is 'Structube'- 'Structube' to be checked in filters", () => {
  const state = {
    seller: {
      value: ["Structube"],
      sellers: ["Structube", "BestBuy"],
    },
  };

  const wrapper = mountTest(state, () => {});

  const input = wrapper.find("input[checked=true]");

  expect(input.html()).toContain('value="Structube"');
});

test("if seller value is 'Structube' and 'BestBuy'- 'Structube' and 'BestBuy' to be checked in filters", () => {
  const state = {
    seller: {
      value: ["Structube", "BestBuy"],
      sellers: ["Structube", "BestBuy"],
    },
  };

  const wrapper = mountTest(state, () => {});

  const inputStructube = wrapper.find({
    value: "Structube",
    type: "checkbox",
  });
  const inputBestBuy = wrapper.find({ value: "BestBuy", type: "checkbox" });
  expect(inputStructube.props().checked).toEqual(true);
  expect(inputBestBuy.props().checked).toEqual(true);
});

test("if seller value is empty - nothing to be checked", () => {
  const state = {
    seller: {
      value: [],
      sellers: ["Structube", "BestBuy"],
    },
  };

  const wrapper = mountTest(state, () => {});

  const inputStructube = wrapper.find({
    value: "Structube",
    type: "checkbox",
  });
  const inputBestBuy = wrapper.find({ value: "BestBuy", type: "checkbox" });
  expect(inputStructube.props().checked).toEqual(false);
  expect(inputBestBuy.props().checked).toEqual(false);
});

function mountTest(filtersState, setFiltersState) {
  return mount(
    <AllFiltersContext.Provider
      value={{
        filtersState,
        setFiltersState,
      }}
    >
      <FilterSeller />
    </AllFiltersContext.Provider>
  );
}
