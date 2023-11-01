import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from "recharts";
import { usePerformanceData } from "../../services/performanceApi";

export default function Performance() {
  const performanceData = usePerformanceData();

  if (performanceData === null) {
    return null; 
  }
  return (
    <RadarChart
      cx={132}
      cy={140}
      outerRadius={80}
      width={400}
      height={300}
      data={performanceData}
    >
      <PolarGrid />
      <PolarAngleAxis
        dataKey="kind"
        axisLine={{ stroke: "white" }}
        tick={{ fill: "white" }}
      />
      <Radar name="User" dataKey="value" fill="#E60000" fillOpacity={0.7} />
    </RadarChart>
  );
}
