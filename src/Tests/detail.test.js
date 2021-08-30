import { Route } from "react-router-dom";
import Detail from "../Pages/Detail";
import { useFetchProduct } from "../Services/fetchData";
import { useUpdateData } from "../Services/updateData";
import { v4 as uuidv4 } from "uuid";
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { UserContext } from "../Contexts/UserContext";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import React, { useState as useStateMock } from "react";

configure({ adapter: new Adapter() });

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

function mountTest(userState, route) {
  const history = createMemoryHistory();

  history.push(route);

  return mount(
    <Router initialEntries={["/"]} history={history}>
      <UserContext.Provider
        value={{
          userData: userState,
        }}
      >
        <Route path="products/:id">
          <Detail />
        </Route>
      </UserContext.Provider>
    </Router>
  );
}

function mountTestWithSetData(userState, setUserState, route) {
  const history = createMemoryHistory();

  history.push(route);

  return mount(
    <Router initialEntries={["/"]} history={history}>
      <UserContext.Provider
        value={{
          userData: userState,
          setUserData: setUserState,
        }}
      >
        <Route path="products/:id">
          <Detail />
        </Route>
      </UserContext.Provider>
    </Router>
  );
}

jest.mock("../Services/fetchData", () => ({
  useFetchProduct: jest.fn(),
}));

jest.mock("../Services/updateData", () => ({
  useUpdateData: jest.fn(),
}));

test("get id from url", () => {
  const state = {
    userId: uuidv4(),
    viewedProducts: [""],
    likedProducts: [""],
  };

  useStateMock.mockImplementation((init) => [init, () => {}]);

  jest.mock("../Services/fetchData", () => ({
    useFetchProduct: jest.fn(),
  }));

  jest.mock("../Services/updateData", () => ({
    useUpdateData: jest.fn(),
  }));
  useFetchProduct.mockImplementation(() => ({}));
  useUpdateData.mockImplementation(() => ({}));
  mountTest(
    state,

    "products/5"
  );

  expect(useFetchProduct).toHaveBeenCalledWith("5");
});

test("render loading if still not have data", () => {
  const state = {
    userId: uuidv4(),
    viewedProducts: [""],
    likedProducts: [""],
  };
  useStateMock.mockImplementation((init) => [init, () => {}]);

  jest.mock("../Services/fetchData", () => ({
    useFetchProduct: jest.fn(),
  }));

  jest.mock("../Services/updateData", () => ({
    useUpdateData: jest.fn(),
  }));
  useFetchProduct.mockImplementation(() => ({ data: "" }));
  useUpdateData.mockImplementation(() => ({}));
  const productWrapper = mountTest(
    state,

    "products/5"
  );

  expect(productWrapper.text()).toContain("loading product..");
});

test("render error if error occurred", () => {
  const state = {
    userId: uuidv4(),
    viewedProducts: [""],
    likedProducts: [""],
  };

  useStateMock.mockImplementation((init) => [init, () => {}]);

  jest.mock("../Services/fetchData", () => ({
    useFetchProduct: jest.fn(),
  }));

  jest.mock("../Services/updateData", () => ({
    useUpdateData: jest.fn(),
  }));
  useFetchProduct.mockImplementation(() => ({
    data: { error: { message: "Something went wrong" } },
  }));
  useUpdateData.mockImplementation(() => ({}));
  const productWrapper = mountTest(
    state,

    "products/5"
  );

  expect(productWrapper.text()).toContain("Something went wrong");
});

test("fetches the product data for the given id", () => {
  const state = {
    userId: "888",
    viewedProducts: ["5"],
    likedProducts: [""],
  };

  useStateMock.mockImplementation((init) => [init, () => {}]);

  jest.mock("../Services/fetchData", () => ({
    useFetchProduct: jest.fn(),
  }));

  jest.mock("../Services/updateData", () => ({
    useUpdateData: jest.fn(),
  }));
  useFetchProduct.mockImplementation(() => ({
    data: {
      id: 5,
      price: 700,
      currency: "CA",
      name: "ROSA accent table 38cm",
      description:
        "Add a dash of Art Deco glamour to your living space with Rosa, a beautiful circular table made of aluminum. Rosa’s small scale is perfect for placement beside a sofa, while its metallic finish (available in gold or silver) reflects the light. Try this dazzling accent piece in the bedroom, dining room and office, too",
      key: 1239,
      active: true,
      date: "2020-03-19T07:22Z",
      url: "https://www.structube.com/en_ca/rosa-accent-table-38cm-19-44-10?pid=22592",
      img: "https://www.structube.com/cdn-cgi/image/width=700,height=542.8888888888888,fit=pad,background=%23f2f2f2/media/catalog/product/0/1/01-19.44.10.30_accent-table_rosa.jpg",
      category: "furniture",
      seller: "Structube",
      likes: ["ba389edc-c211-4742-86d5-2fdf8e71a3f3"],
      views: ["ba389edc-c211-4742-86d5-2fdf8e71a3f3", "888"],
      priceHistory: [
        {
          amount: 180,
          date: 1606861107000,
        },
        {
          amount: 140,
          date: 1612217907000,
        },
        {
          amount: 130,
          date: 1614637107000,
        },
      ],
    },
  }));
  useUpdateData.mockImplementation(() => ({}));
  const productWrapper = mountTest(
    state,

    "products/5"
  );
  const linkBuy = productWrapper.find('a[id="buy"]');
  expect(linkBuy.props().href).toEqual(
    "https://www.structube.com/en_ca/rosa-accent-table-38cm-19-44-10?pid=22592"
  );
  const productName = productWrapper.find('h1[id="productName"]');
  expect(productName.text()).toEqual("ROSA accent table 38cm");
});
test("click like product = call setLiked and setUserData", () => {
  const state = {
    userId: "888",
    viewedProducts: ["5"],
    likedProducts: [],
  };

  jest.mock("../Services/fetchData", () => ({
    useFetchProduct: jest.fn(),
  }));

  jest.mock("../Services/updateData", () => ({
    useUpdateData: jest.fn(),
  }));
  useFetchProduct.mockImplementation(() => ({
    data: {
      id: 5,
      price: 700,
      currency: "CA",
      name: "ROSA accent table 38cm",
      description:
        "Add a dash of Art Deco glamour to your living space with Rosa, a beautiful circular table made of aluminum. Rosa’s small scale is perfect for placement beside a sofa, while its metallic finish (available in gold or silver) reflects the light. Try this dazzling accent piece in the bedroom, dining room and office, too",
      key: 1239,
      active: true,
      date: "2020-03-19T07:22Z",
      url: "https://www.structube.com/en_ca/rosa-accent-table-38cm-19-44-10?pid=22592",
      img: "https://www.structube.com/cdn-cgi/image/width=700,height=542.8888888888888,fit=pad,background=%23f2f2f2/media/catalog/product/0/1/01-19.44.10.30_accent-table_rosa.jpg",
      category: "furniture",
      seller: "Structube",
      likes: ["888"],
      views: ["ba389edc-c211-4742-86d5-2fdf8e71a3f3", "888"],
      priceHistory: [
        {
          amount: 180,
          date: 1606861107000,
        },
        {
          amount: 140,
          date: 1612217907000,
        },
        {
          amount: 130,
          date: 1614637107000,
        },
      ],
    },
  }));

  const changeLiked = jest.fn();
  const changeData = jest.fn();
  const mutate = jest.fn();
  useUpdateData.mockImplementation(() => ({ mutate }));
  useStateMock.mockImplementation((init) => [init, changeLiked]);

  const productWrapper = mountTestWithSetData(state, changeData, "products/5");

  const buttonLike = productWrapper.find('button[id="buttonLike"]');

  buttonLike.simulate("click");
  expect(changeData).toHaveBeenCalledTimes(1);
  expect(changeData.mock.calls[0][0](state).likedProducts).toEqual([5]);
  expect(changeLiked).toHaveBeenCalledTimes(1);
  expect(changeLiked).toHaveBeenCalledWith(true);
});

test("if click like product = updateProduct  and put correct userId in likes", () => {
  const state = {
    userId: "88",
    viewedProducts: ["5"],
    likedProducts: [],
  };

  jest.mock("../Services/fetchData", () => ({
    useFetchProduct: jest.fn(),
  }));

  jest.mock("../Services/updateData", () => ({
    useUpdateData: jest.fn(),
  }));
  useFetchProduct.mockImplementation(() => ({
    data: {
      id: 5,
      price: 700,
      currency: "CA",
      name: "ROSA accent table 38cm",
      description:
        "Add a dash of Art Deco glamour to your living space with Rosa, a beautiful circular table made of aluminum. Rosa’s small scale is perfect for placement beside a sofa, while its metallic finish (available in gold or silver) reflects the light. Try this dazzling accent piece in the bedroom, dining room and office, too",
      key: 1239,
      active: true,
      date: "2020-03-19T07:22Z",
      url: "https://www.structube.com/en_ca/rosa-accent-table-38cm-19-44-10?pid=22592",
      img: "https://www.structube.com/cdn-cgi/image/width=700,height=542.8888888888888,fit=pad,background=%23f2f2f2/media/catalog/product/0/1/01-19.44.10.30_accent-table_rosa.jpg",
      category: "furniture",
      seller: "Structube",
      likes: [],
      views: ["ba389edc-c211-4742-86d5-2fdf8e71a3f3", "88"],
      priceHistory: [
        {
          amount: 180,
          date: 1606861107000,
        },
        {
          amount: 140,
          date: 1612217907000,
        },
        {
          amount: 130,
          date: 1614637107000,
        },
      ],
    },
  }));
  const mutate = jest.fn();
  useUpdateData.mockImplementation(() => ({ mutate }));

  const changeLiked = jest.fn();
  const changeData = jest.fn();
  useStateMock.mockImplementation((init) => [init, changeLiked]);

  const productWrapper = mountTestWithSetData(state, changeData, "products/5");

  const buttonLike = productWrapper.find('button[id="buttonLike"]');

  buttonLike.simulate("click");
  expect(mutate).toHaveBeenCalledTimes(1);
  expect(mutate.mock.calls[0][0].likes).toEqual(["88"]);
});

test("put the correct userID in views, if user for the first time is opening that product", () => {
  const state = {
    userId: "88",
    viewedProducts: [],
    likedProducts: [],
  };

  jest.mock("../Services/fetchData", () => ({
    useFetchProduct: jest.fn(),
  }));

  jest.mock("../Services/updateData", () => ({
    useUpdateData: jest.fn(),
  }));
  const changeData = jest.fn();
  useStateMock.mockImplementation((init) => [init, () => {}]);
  useFetchProduct.mockImplementation(() => ({
    data: {
      id: 5,
      price: 700,
      currency: "CA",
      name: "ROSA accent table 38cm",
      description:
        "Add a dash of Art Deco glamour to your living space with Rosa, a beautiful circular table made of aluminum. Rosa’s small scale is perfect for placement beside a sofa, while its metallic finish (available in gold or silver) reflects the light. Try this dazzling accent piece in the bedroom, dining room and office, too",
      key: 1239,
      active: true,
      date: "2020-03-19T07:22Z",
      url: "https://www.structube.com/en_ca/rosa-accent-table-38cm-19-44-10?pid=22592",
      img: "https://www.structube.com/cdn-cgi/image/width=700,height=542.8888888888888,fit=pad,background=%23f2f2f2/media/catalog/product/0/1/01-19.44.10.30_accent-table_rosa.jpg",
      category: "furniture",
      seller: "Structube",
      likes: [],
      views: ["ba389edc-c211-4742-86d5-2fdf8e71a3f3"],
      priceHistory: [
        {
          amount: 180,
          date: 1606861107000,
        },
        {
          amount: 140,
          date: 1612217907000,
        },
        {
          amount: 130,
          date: 1614637107000,
        },
      ],
    },
  }));
  const mutate = jest.fn();
  useUpdateData.mockImplementation(() => ({ mutate }));

  mountTestWithSetData(state, changeData, "products/5");
  expect(mutate).toHaveBeenCalledTimes(1);
  expect(mutate.mock.calls[0][0].views).toEqual([
    "ba389edc-c211-4742-86d5-2fdf8e71a3f3",
    "88",
  ]);
  expect(changeData).toHaveBeenCalledTimes(1);
  expect(changeData.mock.calls[0][0](state).viewedProducts).toEqual(["5"]);
});
test("not call update user and product data, if user already viewed that product", () => {
  const state = {
    userId: "88",
    viewedProducts: ["5"],
    likedProducts: [],
  };

  jest.mock("../Services/fetchData", () => ({
    useFetchProduct: jest.fn(),
  }));

  jest.mock("../Services/updateData", () => ({
    useUpdateData: jest.fn(),
  }));
  const changeData = jest.fn();
  useStateMock.mockImplementation((init) => [init, () => {}]);
  useFetchProduct.mockImplementation(() => ({
    data: {
      id: 5,
      price: 700,
      currency: "CA",
      name: "ROSA accent table 38cm",
      description:
        "Add a dash of Art Deco glamour to your living space with Rosa, a beautiful circular table made of aluminum. Rosa’s small scale is perfect for placement beside a sofa, while its metallic finish (available in gold or silver) reflects the light. Try this dazzling accent piece in the bedroom, dining room and office, too",
      key: 1239,
      active: true,
      date: "2020-03-19T07:22Z",
      url: "https://www.structube.com/en_ca/rosa-accent-table-38cm-19-44-10?pid=22592",
      img: "https://www.structube.com/cdn-cgi/image/width=700,height=542.8888888888888,fit=pad,background=%23f2f2f2/media/catalog/product/0/1/01-19.44.10.30_accent-table_rosa.jpg",
      category: "furniture",
      seller: "Structube",
      likes: [],
      views: ["ba389edc-c211-4742-86d5-2fdf8e71a3f3", "88"],
      priceHistory: [
        {
          amount: 180,
          date: 1606861107000,
        },
        {
          amount: 140,
          date: 1612217907000,
        },
        {
          amount: 130,
          date: 1614637107000,
        },
      ],
    },
  }));
  const mutate = jest.fn();
  useUpdateData.mockImplementation(() => ({ mutate }));

  mountTestWithSetData(state, changeData, "products/5");
  expect(mutate).toHaveBeenCalledTimes(0);
  expect(changeData).toHaveBeenCalledTimes(0);
});

test("check if href on link buy go to correct product store url when click buy", () => {
  const state = {
    userId: "888",
    viewedProducts: ["5"],
    likedProducts: [""],
  };

  useStateMock.mockImplementation((init) => [init, () => {}]);

  jest.mock("../Services/fetchData", () => ({
    useFetchProduct: jest.fn(),
  }));

  jest.mock("../Services/updateData", () => ({
    useUpdateData: jest.fn(),
  }));
  useFetchProduct.mockImplementation(() => ({
    data: {
      id: 5,
      price: 700,
      currency: "CA",
      name: "ROSA accent table 38cm",
      description:
        "Add a dash of Art Deco glamour to your living space with Rosa, a beautiful circular table made of aluminum. Rosa’s small scale is perfect for placement beside a sofa, while its metallic finish (available in gold or silver) reflects the light. Try this dazzling accent piece in the bedroom, dining room and office, too",
      key: 1239,
      active: true,
      date: "2020-03-19T07:22Z",
      url: "https://www.structube.com/en_ca/rosa-accent-table-38cm-19-44-10?pid=22592",
      img: "https://www.structube.com/cdn-cgi/image/width=700,height=542.8888888888888,fit=pad,background=%23f2f2f2/media/catalog/product/0/1/01-19.44.10.30_accent-table_rosa.jpg",
      category: "furniture",
      seller: "Structube",
      likes: ["ba389edc-c211-4742-86d5-2fdf8e71a3f3"],
      views: ["ba389edc-c211-4742-86d5-2fdf8e71a3f3", "888"],
      priceHistory: [
        {
          amount: 180,
          date: 1606861107000,
        },
        {
          amount: 140,
          date: 1612217907000,
        },
        {
          amount: 130,
          date: 1614637107000,
        },
      ],
    },
  }));
  useUpdateData.mockImplementation(() => ({}));

  const productWrapper = mountTest(state, "products/5");

  const linkBuy = productWrapper.find('a[id="buy"]');

  linkBuy.simulate("click");

  expect(linkBuy.props().href).toEqual(
    "https://www.structube.com/en_ca/rosa-accent-table-38cm-19-44-10?pid=22592"
  );
});
