import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getAxios } from "@/api";
import { changeInput } from "@/reducers/change";

function isLogin() {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  } else {
    return false;
  }
}

export default function Keyword() {
  const dispatch = useDispatch();
  const [keywords, setKeywords] = useState([]);
  const navigate = useNavigate();
  const axios = getAxios();
  const { keyword } = useSelector((state) => state.change);

  useEffect(() => {
    const fetchWord = async () => {
      try {
        if (isLogin()) {
        const request = await axios.get("/api/welfare/keyword");
        setKeywords(request.data.body.keywords.slice(0, 10));
        // console.log(request.data.body.keywords);
        // console.log("최신 인기검색어 출력!");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchWord();
  }, [keyword]);

  const onClick = (word) => {
    dispatch(changeInput(word));
    navigate(`/search?keyword=${word}`);
  };

  return (
    <div className="box-border border-[1px] border-solid border-[#e9ecef] h-[50vh] w-[15vw] text-center grid items-center rounded-lg grid-rows-[8vh]">
      <div className="bg-blue-600 w-full h-full leading-[8vh] rounded-tl-md rounded-tr-md text-white">
        인기 검색어
      </div>

      {keywords.map((keyword, i) => (
        <div className="box-border flex hover:underline cursor-pointer" key={i}>
          <div style={{ flexBasis: "30%" }}>
            <span className="text-white bg-blue-800 inline-block text-[.75rem] h-4 leading-[16px] text-center w-[15px] pb-[1px]">
              {i + 1}
            </span>
          </div>
          <div
            className="text-left"
            style={{ flexBasis: "70%" }}
            onClick={(e) => onClick(keyword.keywordName)}
          >
            {keyword.keywordName}
          </div>
        </div>
      ))}
    </div>
  );
}
