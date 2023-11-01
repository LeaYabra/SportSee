import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface UserData {
  day: string;
  sessionLength: number;
}
interface UserDataMap {
  [day: string]: string;
}

const dayMapping: UserDataMap = {
  "1": "L",
  "2": "M",
  "3": "M",
  "4": "J",
  "5": "V",
  "6": "S",
  "7": "D",
};

export const useAverageSessionData = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/user/${id}/average-sessions`)
      .then((response) => response.json())
      .then((data: { data: { sessions: UserData[] } }) => {
        // Mapper les valeurs numériques aux noms des jours de la semaine
        const userDataWithDayNames = data.data.sessions.map((session) => ({
          ...session,
          day: dayMapping[session.day],
        }));
        setUserData(userDataWithDayNames);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données : ", error);
      });
  }, [id]);

  return userData;
};
