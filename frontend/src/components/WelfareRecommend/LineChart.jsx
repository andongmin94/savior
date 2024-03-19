import styled from "styled-components";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { getAxios } from "../../api";
import { useDispatch } from "react-redux";
import {
  welDataName,
  welDataContent,
  welDataId,
} from "../../reducers/welData";

const Container = styled.div`
  max-width: 800px;
  height: 80%;
  // padding: 3vh;
`;

function Chart() {
  const axios = getAxios();
  const [label, setLabel] = useState([]);
  const [datas, setDatas] = useState([]);
  const dispatch = useDispatch();

  const data = {
    labels: label,
    datasets: [
      {
        label: "인기 복지 조회 순",
        data: datas,
        axis: "y",
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(255, 205, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    legend: {
      display: false,
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    indexAxis: "y",
    maintainAspectRatio: false,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await axios.get("/api/welfare/recommend/grouppopular");
        let wel = request.data.map(a => a.welfare_service_name);
        await setLabel(wel);
        await dispatch(welDataName(wel));
        let view = request.data.map(a => a.welfare_view);
        await setDatas(view);
        let welNum = request.data.map(a => a.welfare_id);
        await dispatch(welDataId(welNum));
        let con = request.data.map(a => a.welfare_service_content);
        await dispatch(welDataContent(con));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Bar type="line" data={data} options={options} />
    </Container>
  );
}
export default Chart;
