import  { useEffect, useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from "recharts";

const kindTypeLabels: KindTypeLabelsType = {
  speed: "Vitesse",
  energy: "Energie",
  strength: "Force",
  endurance: "Endurance",
  cardio: "Cardio",
  intensity: "Intensité",
};

interface KindTypeLabelsType {
  [key:string]: string
}

interface PerformanceData {
  value: number;
  kind: string;
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
            (entry: PerformanceData) => {
              entry.kind === type;
            }
          );
          performanceDataWithLabels = performanceDataWithLabels.concat(performanceData.map((entry: PerformanceData) => {
            return {...entry, kind: kindTypeLabels[type]}
          }));
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
