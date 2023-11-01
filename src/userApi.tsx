import { useEffect, useState } from 'react';

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

function UserApi(): UserData {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/user/18')
      .then(response => response.json())
      .then((data: UserData) => {
        setUserData(data);
      })
      .catch(error => {
        console.error('Une erreur s\'est produite : ', error);
      });
  }, []);

  return userData || { data: { userInfos: { firstName: '' }, keyData: { calorieCount: 0, proteinCount: 0, carbohydrateCount: 0, lipidCount:0},
  score: 0, todayScore: 0 }};
}

export default UserApi;
