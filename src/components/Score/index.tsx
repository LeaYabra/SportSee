import React, { useCallback, useState, useEffect } from "react";
import { PieChart, Pie} from "recharts";


export default function App() {
  const [todayScore, setTodayScore] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Effectuer une requête HTTP pour récupérer la valeur de todayScore.
    fetch("http://localhost:3000/user/12/")
      .then((response) => response.json())
      .then((data) => {
        // Extraire la valeur de todayScore des données et la convertir en pourcentage.
        const todayScoreData = parseFloat(data.data.todayScore) * 100;
        setTodayScore(todayScoreData);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données : ", error);
      });
  }, []);

  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const data = [
    { name: "Today Score", value: todayScore },
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
        <g>

        <circle cx={cx} cy={cy} r={90} fill="white" />
        <text x={cx} y={cy - 30} fill="black" fontSize="xx-large" fontWeight="bold">
            <tspan x={cx} dy="0" textAnchor="middle">
            12%
            </tspan>
        </text>
        <text x={cx +10 } y={cy } textAnchor="middle"  dominantBaseline="central"  fontSize="x-large" fontWeight="500" fill="#74798C"  >
          de votre 
        </text>

        <text x={cx +10 } y={cy + 35} textAnchor="middle"  dominantBaseline="central"  fontSize="x-large" fontWeight="500" fill="#74798C"  >
        objectif
        </text>
        <text x={cx -90} y={cy - 120} fontSize="x-large" fill="black" fontWeight={500}>
        Score
      </text>
      </g>
      
    );
  };
  // Calculer startAngle et endAngle en fonction de todayScoreData
 
  const startAngle = 90; // Débute en haut 
  const endAngle = 90 + (todayScore * 180) / 100;
  
  

  return (
    <div style={{ position: "absolute", fill:'pink'}}>
    <PieChart width={400} height={300}>
      <Pie
        activeIndex={activeIndex}
        data={data}
        cx={115}
        cy={150}
        innerRadius={90}
        outerRadius={100}
        fill="red"
        dataKey="value"
        onMouseEnter={onPieEnter}
        label={renderCustomizedLabel}
        startAngle={startAngle}
        endAngle={endAngle}
        isAnimationActive={false}
        animationDuration={0}
        cornerRadius={10}
        labelLine={false} 
      />
    </PieChart>
    </div>
  );
}
