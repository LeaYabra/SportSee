import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// Creation d'une interface pour définir le type des données
interface Session {
  kilogram: number;
  calories: number;
  payload: Array<{ pv: number; uv: number }>;
}

const Activity: React.FC = () => {
  const [data, setData] = useState<Session[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/user/18/activity")
      .then((response) => response.json())
      .then((result: { data: { sessions: Session[] } }) => {
  
        const formattedData = result.data.sessions.map((session, index) => ({
          name: (index + 1).toString(),
          kilogram: session.kilogram,
          calories: session.calories,
          pv: session.kilogram,
          uv: session.calories,
          payload: [{ pv: session.kilogram, uv: session.calories }],
        }));
        setData(formattedData);
      })
      .catch((error) => console.error("Erreur lors de la récupération des données :", error));
  }, []);
  
  

  return (
    <div>
      <style>
        {`
         .recharts-cartesian-grid-horizontal line:first-of-type {
          stroke-dasharray: none !important; /* Désactive le pointillé */
          }
        `}
      </style>

      {data.length > 0 ? (
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
      ) : (
        <p>Chargement en cours...</p>
      )}
    </div>
  );
};

export default Activity;
