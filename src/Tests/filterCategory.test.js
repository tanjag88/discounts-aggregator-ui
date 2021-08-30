import React from "react";
import { mount, configure } from "enzyme";
import FilterCategory from "../Components/FilterCategory";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import "@testing-library/jest-dom";
import { AllFiltersContext } from "../Contexts/AllFiltersContext";

configure({ adapter: new Adapter() });

test("if category value is 'furniture' - 'furniture' to be checked in filters", () => {
  const state = {
    category: {
      value: ["furniture"],
      categories: ["furniture", "electronics"],
    },
  };

  const wrapper = mountTest(state, () => {});

  const input = wrapper.find("input[checked=true]");

  expect(input.html()).toContain('value="furniture"');
});

test("if category value is 'furniture' and 'electronics'- 'furniture' and 'electronics' to be checked in filters", () => {
  const state = {
    category: {
      value: ["furniture", "electronics"],
      categories: ["furniture", "electronics"],
    },
  };

  const wrapper = mountTest(state, () => {});

  const inputElectronics = wrapper.find({
    value: "electronics",
    type: "checkbox",
  });
  const inputFurniture = wrapper.find({ value: "furniture", type: "checkbox" });
  expect(inputElectronics.props().checked).toEqual(true);
  expect(inputFurniture.props().checked).toEqual(true);
});

test("if category value is empty - nothing to be checked in filters", () => {
  const state = {
    category: {
      value: [],
      categories: ["furniture", "electronics"],
    },
  };

  const wrapper = mountTest(state, () => {});

  const inputElectronics = wrapper.find({
    value: "electronics",
    type: "checkbox",
  });
  const inputFurniture = wrapper.find({ value: "furniture", type: "checkbox" });
  expect(inputElectronics.props().checked).toEqual(false);
  expect(inputFurniture.props().checked).toEqual(false);
});

function mountTest(filtersState, setFiltersState) {
  return mount(
    <AllFiltersContext.Provider
      value={{
        filtersState,
        setFiltersState,
      }}
    >
      <FilterCategory />
    </AllFiltersContext.Provider>
  );
}
