import { useEffect, useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from "recharts";

const kindTypeLabels: KindTypeLabelsType = {
  intensity: "Intensité",
  speed: "Vitesse",
  strength: "Force",
  endurance: "Endurance",
  energy: "Energie",
  cardio: "Cardio",
};

const mapType: MapTypeType = {
  1: "cardio",
  2: "energy",
  3: "endurance",
  4: "strength",
  5: "speed",
  6: "intensity",
};

interface MapTypeType {
  [key: number]: string;
}

interface KindTypeLabelsType {
  [key: string]: string;
}

interface PerformanceDataEntry {
  value: number;
  kind: number;
}

interface PerformanceData {
  value: number;
  kind: "Intensité" | "Vitesse" | "Force" | "Endurance" | "Energie" | "Cardio";
}
export default function App() {
  const [performanceData, setPerformanceData] = useState<
    PerformanceData[] | null
  >(null);

  useEffect(() => {
    // Effectuer une requête HTTP pour récupérer les données depuis l'API
    fetch("http://localhost:3000/user/18/performance")
      .then((response) => response.json())
      .then((data) => {
        let performanceDataWithLabels: PerformanceData[] = [];
        Object.keys(kindTypeLabels).map((type: string) => {
          const performanceData = data.data.data.filter(
            (entry: PerformanceDataEntry) => {
              return mapType[entry.kind] === type;
            }
          );
          performanceDataWithLabels = performanceDataWithLabels.concat(
            performanceData.map((entry: PerformanceData) => {
              return { ...entry, kind: kindTypeLabels[type] };
            })
          );
        });
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
      <PolarAngleAxis
        dataKey="kind"
        axisLine={{ stroke: "white" }}
        tick={{ fill: "white" }}
      />
      <Radar name="User" dataKey="value" fill="#E60000" fillOpacity={0.7} />
    </RadarChart>
  );
}