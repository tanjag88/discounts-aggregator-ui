import React from "react";
import renderer from "react-test-renderer";
import HistoryPriceChart from "../Components/HistoryPriceChart";

test("renders correctly", () => {
  const priceHistory = [
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
  ];

  const tree = renderer
    .create(<HistoryPriceChart priceHistory={priceHistory} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
