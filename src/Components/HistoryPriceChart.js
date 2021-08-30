import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function HistoryPriceChart({ priceHistory }) {
  const priceHistoryDataPoints = priceHistory.map((p) => ({
    date: new Date(p.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    price: p.amount,
  }));

  return (
    <>
      <LineChart
        width={500}
        height={300}
        data={priceHistoryDataPoints}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis />

        <Tooltip />
        <Legend />
        <Line
          name="Price in CA$"
          type="monotone"
          dataKey="price"
          stroke="#8884d8"
          fill="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </>
  );
}
export default HistoryPriceChart;
