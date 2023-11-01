import { PieChart, Pie } from "recharts";
import UserApi from "../../userApi";

interface DataScore {
  name: string;
  value: number;
}

interface RenderCustomizedLabelProps {
  cx: number,
  cy: number
}

export default function App(): JSX.Element {
  const userData = UserApi();
  const scoreData = (userData.data.todayScore) * 100 || (userData.data.score) * 100  ; 

  const data: DataScore[] = [
      { name: "Today Score", value: scoreData },
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
  }: RenderCustomizedLabelProps) => {
    return (
      <g>
        <circle cx={cx} cy={cy} r={90} fill="white" />
        <text x={cx} y={cy - 30} fill="black" fontSize="xx-large" fontWeight="bold">
          <tspan x={cx} dy="0" textAnchor="middle">
            {scoreData}%
          </tspan>
        </text>
        <text
          x={cx + 10}
          y={cy}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="x-large"
          fontWeight={500}
          fill="#74798C"
        >
          de votre
        </text>
        <text
          x={cx + 10}
          y={cy + 35}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="x-large"
          fontWeight={500}
          fill="#74798C"
        >
          objectif
        </text>
        <text x={cx - 90} y={cy - 120} fontSize="x-large" fill="black" fontWeight={500}>
          Score
        </text>
      </g>
    );
  };
  // Calculer startAngle et endAngle en fonction de todayScoreData
  const startAngle = 90; 
  const endAngle = 90+(scoreData / 100) * 360; // Se termine à l'angle correspondant au pourcentage

    return (
    <div style={{ position: "absolute", fill: "pink" }}>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx={115}
          cy={150}
          innerRadius={90}
          outerRadius={100}
          fill="red"
          dataKey="value"
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
