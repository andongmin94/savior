import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

import { getAxios } from "@/api";
import { likeusedLike, likeusedUsed } from "@/reducers/likeused";
import DetailMain from "@/components/WelfareDetail/DetailMain";
import DetailTabs from "@/components/WelfareDetail/DetailTabs";
import DetailCard from "@/components/WelfareDetail/DetailCard";

const isLogin = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  } else {
    return false;
  }
};

export default function WelfareDetail() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const welfareId = useParams().welfareId;
  const [welfare, setWelfare] = useState({});
  const axios = getAxios();
  const [likeWelfares, setLikeWelfares] = useState([]);
  const [usedWelfares, setUsedWelfares] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const name = welfare.welfare_service_name;
  const content = welfare.welfare_service_content;
  const target = welfare.welfare_target_detail;
  const crit = welfare.welfare_crit;
  const howto = welfare.welfare_howto;
  const contact = welfare.welfare_contact;
  const phone = welfare.welfare_phone;
  const deptName = welfare.welfare_dept_name;
  const siteLink = welfare.welfare_site_link;
  const siteName = welfare.welfare_site_name;

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const request = await axios.get(`/api/welfare/${welfareId}`);
        const datas = request.data.body.welfare;
        setWelfare(datas);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDetail();
  }, []);

  useEffect(() => {
    const fetchRecommend = async () => {
      try {
        const request = await axios.get(`/api/welfare/${welfareId}/recommend`);
        const arr = request.data.sort(() => Math.random() - 0.5);
        setRecommend(arr.slice(0, 3));
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecommend();
    return () => setRecommend([]);
  }, []);

  useEffect(() => {
    const fetchLike = async () => {
      try {
        const request = await axios.get("/api/users/like");
        const datas = request.data.body.likeList;
        if (datas.length !== 0) {
          const ids = await datas.map((data) => data.welfareId);
          const likeIds = await new Set(ids);
          const arr = Array.from(likeIds);
          setLikeWelfares(arr);
          dispatch(likeusedLike(arr));
        } else {
          setLikeWelfares([0]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    // fetchLike();
    const checkLogin = () => {
      if (isLogin()) {
        fetchLike();
      }
    };
    checkLogin();
    return () => setLikeWelfares([]);
  }, []);

  useEffect(() => {
    const fetchUsed = async () => {
      try {
        const request = await axios.get("api/users/used");
        const datas = request.data.body.usedWelfareList;
        if (datas.length !== 0) {
          const ids = await datas.map((data) => data.welfareId);
          const usedIds = await new Set(ids);
          const arr = Array.from(usedIds);
          setUsedWelfares(arr);
          dispatch(likeusedUsed(arr));
          // console.log(arr);
        } else {
          setUsedWelfares([0]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    // fetchUsed();
    const checkLogin = () => {
      if (isLogin()) {
        fetchUsed();
      }
    };
    checkLogin();
    return () => setUsedWelfares([0]);
  }, []);

  return (
    <div className="box-border grid justify-center mt-[17vh] mb-[5vh]">
      <div className="flex justify-between items-center m-[10px]">
        <div>
          <h2 className="text-xl font-bold">복지서비스 상세(중앙)</h2>
          <div>
            다양한 복지 혜택을 찾고, 지원대상 및 선정기준 등 자세한 내용을
            확인할 수 있습니다.
          </div>
        </div>
        <Button
          className="bg-blue-700 border-none texd-white font-bold"
          sx={{ height: 35 }}
          onClick={() => {
            navigate(-1);
          }}
        >
          뒤로가기
        </Button>
      </div>
      {likeWelfares.length !== 0 && usedWelfares.length !== 0 ? (
        <DetailMain
          welfareId={welfareId}
          Name={name}
          Content={content}
          likeNum={likeWelfares}
          usedNum={usedWelfares}
        />
      ) : (
        <DetailMain welfareId={welfareId} Name={name} Content={content} />
      )}
      <DetailTabs
        target={target}
        content={content}
        crit={crit}
        howto={howto}
        contact={contact}
        phone={phone}
        deptName={deptName}
        siteLink={siteLink}
        siteName={siteName}
      />
      <div>
        <span className="text-decoration-none inline text-xl shadow-[0_-6px_rgba(75,_112,_253,_0.3)_inset]">
          유사한 복지를 추천합니다
        </span>
      </div>
      <br />
      <div className="flex justify-between m-[10px] border rounded-sm">
        {recommend.map((wel, index) => {
          return likeWelfares.length !== 0 ? (
            <DetailCard key={index} recommend={wel} likeNum={likeWelfares} />
          ) : (
            <DetailCard key={index} recommend={wel} />
          );
        })}
      </div>
    </div>
  );
}
