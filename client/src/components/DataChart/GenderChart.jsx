import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function GenderChart({ data }) {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: `${data.Male}`, label: "Male", color: "#1e88e5" },
            {
              id: 1,
              value: `${data.Female}`,
              label: "Female",
              color: "#d81b60",
            },
          ],
          innerRadius: 20,
          outerRadius: 105,
          paddingAngle: 1,
          cornerRadius: 4,
          startAngle: 0,
          endAngle: 360,
        },
      ]}
    />
  );
}
