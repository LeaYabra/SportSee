import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { useActivityData } from "../../services/activityApi";

const Activity: React.FC = () => {
  const data = useActivityData();
  
  return (
    <div>
      <style>
        {`
         .recharts-cartesian-grid-horizontal line:first-of-type {
          stroke-dasharray: none !important; /* Désactive le pointillé */
          }
        `}
      </style>

      <BarChart
        width={800}
        height={250}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid vertical={false} width={650} strokeDasharray="3 1" />
        <XAxis dataKey="name"
          tickSize={20}
          axisLine={false}
          tick={{
            fill: ' #9B9EAC',
            fontWeight: 500,
          }}
          tickLine={{ stroke: 'transparent' }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          domain={[0, 500]}
          tickCount={3}
          axisLine={false}
          tickSize={0}
          tickFormatter={(value) => {
            if (value === 0) {
              return '69';
            } else if (value == 250) {
              return '70';
            } else if (value === 500) {
              return '71';
            } else {
              return '0';
            }
          }}
          tick={{
            fill: ' #9B9EAC',
            fontWeight: 500,
          }}
        />
        <Tooltip content={(props) => {
          const { active, payload } = props;
          if (active && payload && payload.length > 0) {
            const data = payload[0];
            return (
              <div className="custom-tooltip">
                <p
                  style={{
                    background: "#E60000",
                    color: "white",
                    padding: "15px",
                    lineHeight: "3.5",
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  {`${data.payload.pv}kg`}
                  <br />
                  {`${data.payload.uv}kcal`}
                </p>
              </div>
            );
          }
          return null;
        }} />

        <Bar dataKey="pv" fill="#FF0000" radius={[9, 9, 0, 0]} barSize={10} yAxisId="right" />
        <Bar dataKey="empty" fill="transparent" barSize={5} yAxisId="right" />
        <Bar dataKey="uv" fill="#000000" radius={[9, 9, 0, 0]} barSize={10} yAxisId="right" />
      </BarChart>
    </div>
  );
};

export default Activity;