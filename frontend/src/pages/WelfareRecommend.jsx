import { useEffect, useState } from "react";

import Chart from "@/components/WelfareRecommend/Chart";
import LineChart from "@/components/WelfareRecommend/LineChart";
import FilterSlide from "@/components/WelfareRecommend/FilterSlide";
import RecommendSlid from "@/components/WelfareRecommend/RecommendSlide";
import ProfileCard from "@/components/WelfareRecommend/ProfileCard";
import Norecommend from "@/components/WelfareRecommend/Norecommend";

import { getAxios } from "@/api";

import LoginModal from "@/components/LoginModal";

const isLogin = () => {
  if (localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
};

export default function WelfareRecommend() {
  const axios = getAxios();
  const [name, setName] = useState("User");
  const [profile, setProfile] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (isLogin()) {
      setName(localStorage.getItem("name"));
      setProfile(localStorage.getItem("profile"));
    }
  }, []);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        if (isLogin()) {
        const request = await axios.get("/api/welfare/recommend");
        // console.log(request.data.body.welfare);
        setCards(request.data.body.welfare);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchCard();
  }, []);

  return isLogin() ? (
    cards.length === 0 ? (
      <Norecommend profile={profile} name={name} />
    ) : (
      <div className="grid justify-center mx-auto mt-[10vh] mb-[5vh] grid-cols-[70vw]">
        <div className="grid justify-center items-center mt-[5vh] grid-cols-[20%_30%_50%]">
          <ProfileCard profile={profile} name={name} />
          <Chart />
          <LineChart />
        </div>
        <div className="gap-y-[2vh] w-[70vw]">
          <div>
            <h2 className="mt-[5%] mr-[1%] mb-[-2%] ml-0 font-semibold">
              {name}님에게 추천하는 복지
            </h2>
            <br />
            <br />
            <FilterSlide name={name} cards={cards} />
          </div>
          <RecommendSlid />
        </div>
      </div>
    )
  ) : (
    <LoginModal />
  );
}
