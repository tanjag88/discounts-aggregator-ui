import { Route } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import {
  useFetchProducts,
  useFetchProductsWithIds,
} from "../Services/fetchData";
import { UserContext } from "../Contexts/UserContext";
import { Router } from "react-router-dom";
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { AllFiltersContext } from "../Contexts/AllFiltersContext";
import "jest-location-mock";
import { createMemoryHistory } from "history";

configure({ adapter: new Adapter() });

jest.mock("react", () => ({
  ...jest.requireActual("react"),
}));

jest.mock("../Services/fetchData", () => ({
  useFetchProducts: jest.fn(),
  useFetchProductsWithIds: jest.fn(),
}));

function mountTest(userState, filtersState) {
  return mount(
    <Router history={createMemoryHistory()}>
      <UserContext.Provider
        value={{
          userData: userState,
        }}
      >
        <AllFiltersContext.Provider value={{ filtersState: filtersState }}>
          <Route path="/">
            <HomePage />
          </Route>
        </AllFiltersContext.Provider>
      </UserContext.Provider>
    </Router>
  );
}

test("render just popular products section if the user never before opened or liked product and check if rendering correct products", () => {
  const userState = {
    userId: "25",
    viewedProducts: [],
    likedProducts: [],
  };
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
      ],

      noOfProducts: 2,
      totalPages: 1,
      loaded: true,
      code: undefined,
      error: undefined,
    },
  }));

  useFetchProductsWithIds.mockImplementation(() => ({
    data: [],
  }));
  useFetchProductsWithIds.mockImplementation(() => ({
    data: [],
  }));
  const wrapperHomePage = mountTest(userState, filtersState);

  const popularProductsSection = wrapperHomePage.find("#popular-products");
  expect(popularProductsSection.exists()).toBeTruthy();

  const popularProductCards = popularProductsSection
    .find(".product-card")
    .hostNodes();

  expect(popularProductCards.length).toBe(2);
  expect(popularProductsSection.find("#product-card-1").exists()).toBeTruthy();
  expect(popularProductsSection.find("#product-card-2").exists()).toBeTruthy();
  expect(wrapperHomePage.find("#user-favorite-products").exists()).toBeFalsy();
  expect(wrapperHomePage.find("#viewed-products").exists()).toBeFalsy();
});

test("render section your favorite products if the user already liked some of the products and check if rendering correct products", () => {
  const userState = {
    userId: "25",
    viewedProducts: [],
    likedProducts: [1],
  };
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

    url: () => "_sort=views.length&_order=desc",
  };
  useFetchProducts.mockImplementation(() => ({
    data: [],
  }));

  useFetchProductsWithIds
    .mockImplementationOnce(() => ({
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

          url: "https://www.structube.com/en_ca/arwa-interchangeable-sectional-sofabed-with-storage-67-25-78?pid=25458",
          img: "https://www.structube.com/cdn-cgi/image/width=700,height=542.8888888888888,fit=pad,background=%23f2f2f2/media/catalog/product/0/1/01-67.25.78.62_modularsofabed_arwa.jpg",
        },
      ],
    }))
    .mockImplementationOnce(() => ({
      data: [],
    }));

  const wrapperHomePage = mountTest(userState, filtersState);
  const favoriteProductsSection = wrapperHomePage.find(
    "#user-favorite-products"
  );
  expect(favoriteProductsSection.exists()).toBeTruthy();
  const favoriteProductCards = favoriteProductsSection
    .find(".product-card")
    .hostNodes();
  expect(favoriteProductCards.length).toBe(1);
  expect(favoriteProductsSection.find("#product-card-1").exists()).toBeTruthy();
  expect(wrapperHomePage.find("#viewed-products").exists()).toBeFalsy();
  expect(wrapperHomePage.find("#popular-products").exists()).toBeFalsy();
});

test("render section Your recently viewed products if the user already viewed some of the products and check if rendering correct products", () => {
  const userState = {
    userId: "25",
    viewedProducts: [],
    likedProducts: [1],
  };
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

    url: () => "_sort=views.length&_order=desc",
  };
  useFetchProducts.mockImplementation(() => ({
    data: [],
  }));
  useFetchProductsWithIds
    .mockImplementationOnce(() => ({
      data: [],
    }))
    .mockImplementationOnce(() => ({
      data: [
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
      ],
    }));
  const wrapperHomePage = mountTest(userState, filtersState);
  const viewedProductsSection = wrapperHomePage.find("#viewed-products");
  expect(viewedProductsSection.exists()).toBeTruthy();
  const viewedProductCards = viewedProductsSection
    .find(".product-card")
    .hostNodes();
  expect(viewedProductCards.length).toBe(1);
  expect(viewedProductsSection.find("#product-card-2").exists()).toBeTruthy();
  expect(wrapperHomePage.find("#user-favorite-products").exists()).toBeFalsy();
  expect(wrapperHomePage.find("#popular-products").exists()).toBeFalsy();
});
