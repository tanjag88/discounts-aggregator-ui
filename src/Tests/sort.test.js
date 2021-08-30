import React from "react";
import { mount, configure } from "enzyme";
import Sort from "../Components/Sort";
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
      <Sort />
    </AllFiltersContext.Provider>
  );
}

test("if click on sort Newest - newest to be selected", () => {
  const state = { sorting: { value: ["date", "desc"] } };
  const wrapper = mountTest(state, () => {});

  const select = wrapper.find('select');
  const opinion = select.find({ value: ["date", "desc"]});
  expect(opinion.props().selected).toEqual(true);
});

test("if click on sort Default- default to be selected", () => {
  const state = { sorting: { value: [] } };
  const wrapper = mountTest(state, () => {});

  const select = wrapper.find("select");
  const opinion = select.find({ value: "" });
  expect(opinion.props().selected).toEqual(true);
});

test("if click on sort Price (high -low) = Price (high -low) to be selected", () => {
  const state = { sorting: { value: ["price", "desc"] } };
  const wrapper = mountTest(state, () => {});

  const select = wrapper.find("select");
  const opinion = select.find({ value: ["price", "desc"] });
  expect(opinion.props().selected).toEqual(true);
});