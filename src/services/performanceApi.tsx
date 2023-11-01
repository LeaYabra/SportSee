import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

export const usePerformanceData = () => {
  const [performanceData, setPerformanceData] = useState<PerformanceData[] | null>(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/user/${id}/performance`)
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
  }, [id]);

  return performanceData;
};
