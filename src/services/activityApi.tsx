import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

interface Session {
  kilogram: number;
  calories: number;
  payload: Array<{ pv: number; uv: number }>;
}

export const useActivityData = () => {
  const [data, setData] = useState<Session[]>([]);
  const {id} = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/user/${id}/activity`) 
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
  }, [id]);

  return data;
};
