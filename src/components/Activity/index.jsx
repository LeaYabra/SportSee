import React, { useState, useEffect } from "react";
import styles from './activity.module.scss';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,

} from "recharts";

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Faites un appel API pour obtenir les données en utilisant fetch
    fetch("http://localhost:3000/user/12/activity")
      .then((response) => response.json())
      .then((result) => {
        // Reformatez les données pour qu'elles correspondent à la structure attendue
        const formattedData = result.data.sessions.map((session, index) => ({
          name: (index + 1).toString(), // Utilisez l'indice comme numéro
          pv: session.kilogram,
          uv: session.calories
        }));
        setData(formattedData);
      })
      .catch((error) => console.error("Erreur lors de la récupération des données :", error));
  }, []);

  return (
    <div>
      {data.length > 0 ? (
        <BarChart
          width={750}
          height={250}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="right" orientation="right"  domain={[0, 400]}  />
          <Tooltip
            labelStyle={{ display: "none" }} // Désactive l'affichage du numéro de la barre
            formatter={(value, name) => {
              if (name === "pv") {
                return [`${value}kg`]; // Affiche le poids en KG
              } else {
                return [`${value}kcal`]; // Affiche les calories en kcal
              }
            }}
            itemStyle={{ background: "red", color: "white", padding:'20px' }} // Personnalise le style de l'infobulle
          />
       
          <CartesianGrid vertical={false} /> 
          <Bar dataKey="pv" fill="#FF0000" radius={9} barSize={10}  yAxisId="right" /> 
          <Bar dataKey="uv" fill="#000000" radius={9} barSize={10}  yAxisId="right" /> 
       
        </BarChart>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </div>
  );
}
