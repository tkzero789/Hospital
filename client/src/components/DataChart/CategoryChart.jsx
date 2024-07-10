import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function CategoryChart({ data }) {
  return (
    <PieChart
      series={[
        {
          data,
          innerRadius: 20,
          outerRadius: 120,
          paddingAngle: 1,
          cornerRadius: 4,
          startAngle: 0,
          endAngle: 360,
        },
      ]}
      slotProps={{
        legend: {
          direction: "column",
          itemMarkWidth: 20,
          itemMarkHeight: 5,
          markGap: 5,
          itemGap: 7,
        },
      }}
      height={319}
    />
  );
}
