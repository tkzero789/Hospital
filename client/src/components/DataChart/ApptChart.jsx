import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function ApptChart({ data }) {
  const xAxisData = Object.keys(data).map((date) => {
    const [year, month, day] = date.split("-");
    const dateObj = new Date(year, month - 1, day);
    return dateObj.toLocaleString("default", { month: "long", day: "numeric" });
  });
  const seriesData = Object.values(data);

  return (
    <BarChart
      xAxis={[
        {
          id: "barCategories",
          data: xAxisData,
          scaleType: "band",
        },
      ]}
      series={[
        {
          data: seriesData,
          color: "#1199e1",
        },
      ]}
    />
  );
}
