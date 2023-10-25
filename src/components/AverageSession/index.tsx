import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, Tooltip } from "recharts";

const dayMapping = {
 1: "L",
 2: "M",
 3: "M",
 4: "J",
 5: "V",
 6: "S",
 7: "D",
};

export default function AverageSession() {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
     fetch("http://localhost:3000/user/12/average-sessions")
      .then((response) => response.json())
      .then((data) => {
        // Mappe les valeurs numériques aux noms des jours de la semaine
        const userDataWithDayNames = data.data.sessions.map((session) => ({
          ...session,
          day: dayMapping[session.day],
        }));
        setUserData(userDataWithDayNames);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données : ", error);
      });
  }, []);

  return (
    <LineChart width={250} height={150} data={userData}>
      <XAxis
        dataKey="day"
        axisLine={false}
        tickLine={{ stroke: 'transparent', height: 30 }}
        tickSize={20}
        tick={{ fill: 'rgba(255, 255, 255, 0.5)'}}
      />
      <Tooltip
        cursor={{ stroke: 'transparent', strokeWidth: 0 }}
        content={({ active, payload }) => {
          if (active && payload && payload.length) {
            const sessionLength = payload[0].value;
            return (
              <div style={{ background: '#fff', padding: '10px', fontWeight:500 }}>
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
