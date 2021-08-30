import React from "react";
import { mount, configure } from "enzyme";
import Header from "../Components/Header";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import "@testing-library/jest-dom";
import { createMemoryHistory } from "history";
import { AllFiltersContext } from "../Contexts/AllFiltersContext";
import { Router } from "react-router-dom";
import "jest-location-mock";

configure({ adapter: new Adapter() });

function mountTest(filtersState, setFiltersState, history) {
  return mount(
    <Router history={history}>
      <AllFiltersContext.Provider
        value={{
          filtersState,
          setFiltersState,
        }}
      >
        <Header />
      </AllFiltersContext.Provider>
    </Router>
  );
}

test("is select furniture from nav menu - furniture to be preselected in filters", () => {
  const stateTest = {
    category: {
      value: [],
      categories: ["furniture", "electronics"],
    },
    searchQuery: { value: "" },
  };

  const changeState = jest.fn();
  const history = createMemoryHistory();
  const wrapperHeader = mountTest(stateTest, changeState, history);

  const handleClick = jest.spyOn(React, "useContext");

  handleClick.mockImplementation([stateTest, changeState]);

  const aFurniture = wrapperHeader.findWhere(
    (n) => n.name() === "a" && n.html().includes("Categories")
  );

  aFurniture.simulate("click");

  const linkToFurniture = wrapperHeader.findWhere(
    (n) => n.name() === "a" && n.prop("href") === "/products?category=furniture"
  );

  linkToFurniture.simulate("click");

  expect(changeState).toHaveBeenCalledTimes(1);
  expect(changeState.mock.calls[0][0].category.value).toEqual(["furniture"]);
});

test('if type  "macedonia" in search to call setState with search query value "macedonia"', () => {
  const stateTest = {
    searchQuery: { value: "" },
    url: function (state) {
      return "q=searchText";
    },
  };
  const changeState = jest.fn();

  const historyMock = { ...createMemoryHistory(), push: jest.fn() };
  const wrapperHeader = mountTest(stateTest, changeState, historyMock);

  const handleClick = jest.spyOn(React, "useContext");

  handleClick.mockImplementation([stateTest, changeState]);
  const search = wrapperHeader.find('input[type="text"]');

  search.simulate("change", { target: { value: "macedonia" } });
  const button = wrapperHeader.find("form").find("button");

  button.simulate("click");

  expect(changeState).toHaveBeenCalledTimes(1);

  expect(changeState.mock.calls[0][0](stateTest).searchQuery.value).toEqual(
    "macedonia"
  );

  expect(historyMock.push).toHaveBeenCalledTimes(1);
  expect(historyMock.push.mock.calls[0][0]).toContain("q=searchText");
});
