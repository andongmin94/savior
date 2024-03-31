import { useEffect, useState } from "react";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

import { getAxios } from "@/api";

export default function Chart() {
  const axios = getAxios();
  const [label, setLabel] = useState([]);
  const [datas, setDatas] = useState([]);

  const data = {
    labels: label,
    datasets: [
      {
        label: "My First Dataset",
        data: datas,
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(255, 159, 64, 0.8)",
          "rgba(255, 205, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(153, 102, 255, 0.8)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/welfare/recommend/purpose");
        // console.log(res.data);
        let wel = res.data;
        await setLabel(Object.keys(wel).slice(0, 6));
        await setDatas(Object.values(wel).slice(0, 6));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-[3vh]">
      <Doughnut type="doughnut" data={data} />
    </div>
  );
}
