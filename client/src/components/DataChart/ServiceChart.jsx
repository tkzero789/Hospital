import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { mangoFusionPalette } from "@mui/x-charts";

export default function ServiceChart({ data }) {
  return (
    <PieChart
      series={[
        {
          data,
          innerRadius: 20,
          outerRadius: 105,
          paddingAngle: 1,
          cornerRadius: 4,
          startAngle: 0,
          endAngle: 360,
        },
      ]}
      colors={mangoFusionPalette}
    />
  );
}
