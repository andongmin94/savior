import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getAxios } from "@/api";
import { changeInput } from "@/reducers/change";

export default function Keyword() {
  const dispatch = useDispatch();
  const [keywords, setKeywords] = useState([]);
  const navigate = useNavigate();
  const axios = getAxios();
  const { keyword } = useSelector((state) => state.change);

  useEffect(() => {
    const fetchWord = async () => {
      try {
        const request = await axios.get("/api/welfare/keyword");
        setKeywords(request.data.body.keywords.slice(0, 10));
        // console.log(request.data.body.keywords);
        // console.log("최신 인기검색어 출력!");
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
      <div
        style={{
          background: "#fb923c",
          width: "100%",
          height: "100%",
          lineHeight: "8vh",
          borderRadius: "15px 15px 0px 0px",
          color: "white",
        }}
      >
        인기 검색어
      </div>

      {keywords.map((keyword, i) => (
        <div className="box-border flex hover:underline cursor-pointer" key={i}>
          <div style={{ flexBasis: "30%" }}>
            <span
              style={{
                color: "white",
                backgroundColor: "#0d6dfd",
                display: "inline-block",
                fontSize: ".75rem",
                height: "16px",
                lineHeight: "16px",
                textAlign: "center",
                width: "15px",
                paddingBottom: "1px",
              }}
            >
              {i + 1}
            </span>
          </div>
          <div
            style={{ flexBasis: "70%", textAlign: "left" }}
            onClick={(e) => onClick(keyword.keywordName)}
          >
            {keyword.keywordName}
          </div>
        </div>
      ))}
    </div>
  );
}