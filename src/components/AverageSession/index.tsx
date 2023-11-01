import { LineChart, Line, XAxis, Tooltip } from "recharts";
import { useAverageSessionData } from "../../services/averageSessionApi";

export default function AverageSession() {
  const userData = useAverageSessionData();
  
  return (
    <LineChart width={250} height={150} data={userData}>
      <XAxis
        dataKey="day"
        axisLine={false}
        tickLine={{ stroke: "transparent", height: 30 }}
        tickSize={20}
        tick={{ fill: "rgba(255, 255, 255, 0.5)" }}
      />
      <Tooltip
        cursor={{ stroke: "transparent", strokeWidth: 0 }}
        content={({ active, payload }) => {
          if (active && payload && payload.length) {
            const sessionLength = payload[0].value;
            return (
              <div style={{ background: "#fff", padding: "10px", fontWeight: 500 }}>
                {`${sessionLength} min`}
              </div>
            );
          }
          return null;
        }}
      />
      <Line
        type="natural"
        dataKey="sessionLength"
        strokeWidth={3}
        dot={false}
        stroke="url(#gradient)"
      />
      <defs>
        <linearGradient id="gradient">
          <stop offset="40%" stopColor="#ffff" stopOpacity={0.5} />
          <stop offset="60%" stopColor="#ffff" stopOpacity={0.8} />
          <stop offset="75%" stopColor="#ffff" stopOpacity={1} />
        </linearGradient>
      </defs>
    </LineChart>
  );
}
