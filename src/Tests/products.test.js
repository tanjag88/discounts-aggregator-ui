import { Route } from "react-router-dom";
import Products from "../Pages/Products";
import { useFetchProducts } from "../Services/fetchData";
import { AllFiltersContext } from "../Contexts/AllFiltersContext";
import { Router } from "react-router-dom";
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import "jest-location-mock";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom";
import React from "react";

configure({ adapter: new Adapter() });

jest.mock("react", () => ({
  ...jest.requireActual("react"),
}));

jest.mock("../Services/fetchData", () => ({
  useFetchProducts: jest.fn(),
}));

function mountTest(filtersState, setFiltersState) {
  const history = createMemoryHistory();

  history.push("/products");

  return mount(
    <Router history={history}>
      <AllFiltersContext.Provider
        value={{ filtersState: filtersState, setFiltersState: setFiltersState }}
      >
        <Route path="/products">
          <Products />
        </Route>
      </AllFiltersContext.Provider>
    </Router>
  );
}

test("rendering 3 products if 3 products are fetched", () => {
  const filtersState = {
    category: {
      value: [""],
      categories: ["furniture", "electronics"],
    },
    seller: {
      value: [""],
      sellers: ["Structube", "BestBuy"],
    },
    priceRange: {
      value: [0, 10000],
    },
    sorting: { value: "" },
    limit: { value: 6 },
    currentPage: { value: 1 },
    searchQuery: { value: "" },

    url: () => "",
  };

  useFetchProducts.mockImplementation(() => ({
    data: {
      data: [
        {
          id: 1,
          price: 1001,
          currency: "CA",
          name: "ARWA interchangeable sectional sofa-bed with storage",
          description:
            "The Arwa interchangeable sectional sofa-bed with storage is a convenient beauty. Sturdy and plush, the cushioned sits an eucalyptus wood frame. Arwa is the perfect addition to any home and is as practical as it is charming.",
          key: 123,
          active: true,
          date: "2021-05-19T07:22Z",
          url: "https://www.structube.com/en_ca/arwa-interchangeable-sectional-sofabed-with-storage-67-25-78?pid=25458",
          img: "https://www.structube.com/cdn-cgi/image/width=700,height=542.8888888888888,fit=pad,background=%23f2f2f2/media/catalog/product/0/1/01-67.25.78.62_modularsofabed_arwa.jpg",
        },
        {
          id: 2,
          price: 2000,
          currency: "CA",
          name: "Apple MacBook Air 13.3 w/ Touch ID (Fall 2020) - Space Grey (Apple M1 Chip / 256GB SSD / 8GB RAM) - En",
          description:
            "Apple’s thinnest and lightest notebook gets supercharged with the Apple M1 chip. Tackle your projects with the blazing-fast 8-core CPU. Take graphics-intensive apps and games to the next level with a 7-core GPU. Accelerate machine-learning tasks with the 16-core Neural Engine. All with a silent, fanless design and the longest battery life ever -- up to 18 hours",
          key: 12344,
          active: true,
          date: "2020-06-19T07:22Z",
          url: "https://www.bestbuy.ca/en-ca/product/apple-macbook-air-13-3-w-touch-id-fall-2020-space-grey-apple-m1-chip-256gb-ssd-8gb-ram-en/15136919",
          img: "https://multimedia.bbycastatic.ca/multimedia/products/500x500/151/15136/15136919.jpg",
        },
        {
          id: 3,
          price: 799,
          currency: "CA",
          name: "MACEDONIA concrete and mango wood dining table 220 cm",
          description:
            "Macedonia is no ordinary table. From a far this wood dining table is elegant and sturdy, but if you take a closer look, you’ll discover the tabletop features a beautiful embedded concrete slab. In addition to its beautiful figure, its wooden base is made of sustainable sourced mango wood and the base is masterfully handcrafted, making each table subtly one of a kind. Macedonia is sure to become the focal point in your dining room. You’ll enjoy this masterpiece for years to come.",
          key: 12333,
          active: true,
          date: "2020-05-19T07:22Z",
          url: "https://www.structube.com/en_ca/macedonia-concrete-and-mango-wood-dining-table-220-cm-86-39-76?pid=26678",
          img: "https://www.structube.com/cdn-cgi/image/width=700,height=542.8888888888888,fit=pad,background=%23f2f2f2/media/catalog/product/0/1/01-86.39.76.30_dinningtable_macedonia.jpg",
          category: "furniture",
          seller: "Structube",
        },
      ],

      noOfProducts: 3,
      totalPages: 1,
      loaded: true,
      code: undefined,
      error: undefined,
    },
  }));

  const wrapperHomePage = mountTest(filtersState);
  const rowProducts = wrapperHomePage.find("#row-products");
  const products = rowProducts.find("#product-in-products").hostNodes();
  expect(products.length).toBe(3);
  expect(products.find("#product-id-3").exists()).toBeTruthy();
  expect(products.find("#product-id-100").exists()).toBeFalsy();
});

test("paginate, if fetch return 3 products to have 1 page, and next page to be disabled", () => {
  const filtersState = {
    category: {
      value: [""],
      categories: ["furniture", "electronics"],
    },
    seller: {
      value: [""],
      sellers: ["Structube", "BestBuy"],
    },
    priceRange: {
      value: [0, 10000],
    },
    sorting: { value: "" },
    limit: { value: 6 },
    currentPage: { value: 1 },
    searchQuery: { value: "" },

    url: () => "",
  };

  useFetchProducts.mockImplementation(() => ({
    data: {
      data: [],

      noOfProducts: 3,
      totalPages: 1,
      loaded: true,
      code: undefined,
      error: undefined,
    },
  }));
  const changeState = jest.fn();
  const wrapperHomePage = mountTest(filtersState, changeState);

  const pages = wrapperHomePage.find("a.page-link");

  expect(pages.length).toBe(3);
  expect(pages.at(2).prop("rel")).toContain("next");
  expect(pages.at(2).prop("aria-disabled")).toEqual("true");
});

test("paginate, if fetch return more than 6 products to have 2 pages, and next page not to be disabled", () => {
  const filtersState = {
    category: {
      value: [""],
      categories: ["furniture", "electronics"],
    },
    seller: {
      value: [""],
      sellers: ["Structube", "BestBuy"],
    },
    priceRange: {
      value: [0, 10000],
    },
    sorting: { value: "" },
    limit: { value: 6 },
    currentPage: { value: 1 },
    searchQuery: { value: "" },

    url: () => "",
  };

  useFetchProducts.mockImplementation(() => ({
    data: {
      data: [],

      noOfProducts: 8,
      totalPages: 2,
      loaded: true,
      code: undefined,
      error: undefined,
    },
  }));

  const wrapperHomePage = mountTest(filtersState);

  const pages = wrapperHomePage.find("a.page-link");

  expect(pages.length).toBe(4);
  expect(pages.at(2).prop("aria-label")).toContain("Page 2");
  expect(pages.at(3).prop("aria-disabled")).toEqual("false");
});

test("paginate, if fetch return more 8 products, check if fetch function is call again if click on next page button", () => {
  const filtersState = {
    category: {
      value: [""],
      categories: ["furniture", "electronics"],
    },
    seller: {
      value: [""],
      sellers: ["Structube", "BestBuy"],
    },
    priceRange: {
      value: [0, 10000],
    },
    sorting: { value: "" },
    limit: { value: 6 },
    currentPage: { value: 1 },
    searchQuery: { value: "" },

    url: () => "",
  };

  useFetchProducts.mockImplementation(() => ({
    data: {
      data: [],

      noOfProducts: 8,
      totalPages: 2,
      loaded: true,
      code: undefined,
      error: undefined,
    },
  }));
  const changeState = jest.fn();
  const wrapperHomePage = mountTest(filtersState, changeState);
  const handleClick = jest.spyOn(React, "useContext");
  handleClick.mockImplementation([filtersState, changeState]);
  expect(useFetchProducts).toBeCalledWith(filtersState);

  const pages = wrapperHomePage.find("a.page-link");
  expect(pages.length).toBe(4);
  const nextPage = pages.at(3);
  nextPage.simulate("click");
  expect(changeState.mock.calls[0][0](filtersState).currentPage.value).toEqual(
    2
  );

});
