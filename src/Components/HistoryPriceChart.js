import React from "react";
import { CanvasJSChart } from "canvasjs-react-charts";

export default function HistoryPriceChart({ priceHistory }) {
  const priceHistoryDataPoints = priceHistory.map((p) => ({
    x: p.date,
    y: p.amount,
  }));
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", // "light1", "dark1", "dark2"
    title: {
      text: "Price history",
    },
    axisY: {
      title: "Price",
      suffix: "$",
    },
    axisX: {
      title: "Date",

      interval: 2,
    },
    data: [
      {
        type: "line",
        xValueType: "dateTime",
        dataPoints: priceHistoryDataPoints,
      },
    ],
  };
  return (
    <div>
      <CanvasJSChart
        options={options}
        
      />
      
    </div>
  );

}
