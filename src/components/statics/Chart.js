/* eslint-disable */
import React, { useContext, useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

import StatisticsContext from "../../contexts/Statistics/StatisticsContext";

const Chart = () => {
  // a state created to stop the infinite loop of useEffect
  const [myState] = useState(0);
  //Calling the context that gets the statics and send compatible array to chartjs
  const StaticsList = useContext(StatisticsContext);

  useEffect(() => {
    StaticsList.GetStatistics();
  }, [myState]);

  // ChartJS initial data
  const data = {
    labels: [
      "Adoption",
      "Animals",
      "Animals Checkup",
      "Animals this week",
      "Animals this Month",
      "Animals",
    ],
    datasets: [
      {
        label: "Number",
        data: StaticsList.statics,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Bar height={400} data={data} options={{ maintainAspectRatio: false }} />;
};

export default Chart;
