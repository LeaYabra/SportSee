import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

interface UserData {
  data: {
    userInfos: {
      firstName: string;
    };
    keyData: {
      calorieCount: number; 
      proteinCount: number; 
      carbohydrateCount: number;
      lipidCount: number;
    };
   score: number;
   todayScore:number;
  };
}

function UserApi() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const {id} = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/user/${id}`)
      .then(response => response.json())
      .then((data: UserData) => {
        setUserData(data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données : ", error);
      });
  }, [id]);

  return userData || null;
}

export default UserApi;