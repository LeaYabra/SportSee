import React, { useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis
} from "recharts";

export default function App() {
  const [performanceData, setPerformanceData] = useState(null);

  useEffect(() => {
    // Effectuer une requête HTTP pour récupérer les données depuis l'API
    fetch("http://localhost:3000/user/12/performance")
      .then((response) => response.json())
      .then((data) => {
        const kindMapping = data.data.kind;
        // Remplacer les valeurs de kind par leurs dénominations correspondantes
        const performanceDataWithLabels = data.data.data.map((entry) => ({
          value: entry.value,
          kind: kindMapping[entry.kind] === "speed" ? "Vitesse":
                kindMapping[entry.kind] === "energy" ? "Energie" :
                kindMapping[entry.kind] === "cardio" ? "Cardio" :
                kindMapping[entry.kind] === "strength" ? "Force" :
                kindMapping[entry.kind] === "endurance" ? "Endurance":
                kindMapping[entry.kind] === "intensity" ? "Intensité" :
                kindMapping[entry.kind],
           }));

        // Trier les données en fonction de "kind" dans l'ordre décroissant
        performanceDataWithLabels.sort((a, b) => a.kind - b.kind);

        // Inverser l'ordre du tableau pour que le "kind" 6 soit en haut
        performanceDataWithLabels.reverse();

        setPerformanceData(performanceDataWithLabels);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données : ", error);
      });
  }, []);

  if (!performanceData) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <RadarChart
      cx={138}
      cy={140}
      outerRadius={80}
      width={400}
      height={300}
      data={performanceData}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="kind" axisLine={{ stroke: "white" }} tick={{ fill: "white" }} />
      <Radar
        name="User"
        dataKey="value"
        fill="#E60000"
        fillOpacity={0.7}
      />
    </RadarChart>
  );
}
