import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewsTicker from "react-advanced-news-ticker";

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

export default function SearchBar() {
  const axios = getAxios();
  const dispatch = useDispatch();
  const [keywords, setKeywords] = useState([]);
  const [word, setWord] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    setWord(e.target.value);
  };

  const onEnter = async (e) => {
    if (e.key === "Enter") {
      // console.log(e);
      await setWord(e.target.value);
      await dispatch(changeInput(word));
      navigate(`/search?keyword=${word}`);
      await setWord("");
    }
  };

  const onClick = (word) => {
    // console.log(word);
    dispatch(changeInput(word));
    navigate(`/search?keyword=${word}`);
    setWord("");
  };

  useEffect(() => {
    const fetchWord = async () => {
      try {
        if (isLogin()) {
          const request = await axios.get("/api/welfare/keyword");
          setKeywords(request.data.body.keywords.slice(0, 10));
          // console.log(request.data.body.keywords.slice(0, 10));
          // console.log(keywords[0].keywordName);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchWord();
  }, []);

  return (
    <div className="searchBar">
      <div className="flex items-start">
        <div className="flex flex-col mb-[7px]">
          <div className="w-[200px] bg-white text-[13px] pl-[5%] rounded-t-[3px] rounded-b-none">
            인기검색어
          </div>
          {keywords.length === 10 ? (
            <NewsTicker
              rowHeight={24}
              rowWidth={80}
              maxRows={1}
              speed={600}
              duration={4000}
              autoStart={true}
              pauseOnHover={true}
              className="w-[200px] p-[0_5%] bg-white rounded-b-[3px] list-none"
            >
              <div onClick={(e) => onClick(keywords[0].keywordName)}>
                <strong>
                  <span className="text-white bg-blue-800 inline-block text-xs h-[16px] leading-[16px] text-center w-[15px] pb-[1px] mr-[1px] rounded-[2px]">
                    1
                  </span>
                  &nbsp;
                  {keywords[0].keywordName}
                </strong>
              </div>
              <div onClick={(e) => onClick(keywords[1].keywordName)}>
                <strong>
                  <span className="text-white bg-blue-800 inline-block text-xs h-[16px] leading-[16px] text-center w-[15px] pb-[1px] mr-[1px] rounded-[2px]">
                    2
                  </span>
                  &nbsp;&nbsp;
                  {keywords[1].keywordName}
                </strong>
              </div>
              <div onClick={(e) => onClick(keywords[2].keywordName)}>
                <strong>
                  {" "}
                  <span className="text-white bg-blue-800 inline-block text-xs h-[16px] leading-[16px] text-center w-[15px] pb-[1px] mr-[1px] rounded-[2px]">
                    3
                  </span>{" "}
                  &nbsp;
                  {keywords[2].keywordName}
                </strong>
              </div>
              <div onClick={(e) => onClick(keywords[3].keywordName)}>
                <strong>
                  {" "}
                  <span className="text-white bg-blue-800 inline-block text-xs h-[16px] leading-[16px] text-center w-[15px] pb-[1px] mr-[1px] rounded-[2px]">
                    4
                  </span>{" "}
                  &nbsp;
                  {keywords[3].keywordName}
                </strong>
              </div>
              <div onClick={(e) => onClick(keywords[4].keywordName)}>
                <strong>
                  {" "}
                  <span className="text-white bg-blue-800 inline-block text-xs h-[16px] leading-[16px] text-center w-[15px] pb-[1px] mr-[1px] rounded-[2px]">
                    5
                  </span>{" "}
                  &nbsp;
                  {keywords[4].keywordName}
                </strong>
              </div>
              <div onClick={(e) => onClick(keywords[5].keywordName)}>
                <strong>
                  {" "}
                  <span className="text-white bg-blue-800 inline-block text-xs h-[16px] leading-[16px] text-center w-[15px] pb-[1px] mr-[1px] rounded-[2px]">
                    6
                  </span>
                  &nbsp;
                  {keywords[5].keywordName}
                </strong>
              </div>
              <div onClick={(e) => onClick(keywords[6].keywordName)}>
                <strong>
                  {" "}
                  <span className="text-white bg-blue-800 inline-block text-xs h-[16px] leading-[16px] text-center w-[15px] pb-[1px] mr-[1px] rounded-[2px]">
                    7
                  </span>
                  &nbsp;
                  {keywords[6].keywordName}
                </strong>
              </div>
              <div onClick={(e) => onClick(keywords[7].keywordName)}>
                <strong>
                  {" "}
                  <span className="text-white bg-blue-800 inline-block text-xs h-[16px] leading-[16px] text-center w-[15px] pb-[1px] mr-[1px] rounded-[2px]">
                    8
                  </span>{" "}
                  &nbsp;
                  {keywords[7].keywordName}
                </strong>
              </div>
              <div onClick={(e) => onClick(keywords[8].keywordName)}>
                <strong>
                  {" "}
                  <span className="text-white bg-blue-800 inline-block text-xs h-[16px] leading-[16px] text-center w-[15px] pb-[1px] mr-[1px] rounded-[2px]">
                    9
                  </span>{" "}
                  &nbsp;
                  {keywords[8].keywordName}
                </strong>
              </div>
              <div onClick={(e) => onClick(keywords[9].keywordName)}>
                <strong>
                  {" "}
                  <span className="text-white bg-blue-800 inline-block text-xs h-[16px] leading-[16px] text-center w-[15px] pb-[1px] mr-[1px] rounded-[2px]">
                    10
                  </span>{" "}
                  &nbsp;
                  {keywords[9].keywordName}
                </strong>
              </div>
            </NewsTicker>
          ) : (
            <div className="w-[200px] py-0 px-[5%] bg-white rounded-[0_0_3px_3px]">
              <strong>인기검색어가 없습니다.</strong>
            </div>
          )}
        </div>

        <Form.Control
          placeholder="검색어를 입력하세요"
          onKeyDown={onEnter}
          onChange={onChange}
          value={word}
          className="w-[1500px] h-[45px] mt-0 mr-[0.4rem] mb-0 ml-[0.5rem]"
        />
        <Button
          type="submit"
          onClick={() => onClick(word)}
          className="w-20 h-[45px] mt-0 mr-0 mb-0 ml-[0.5rem] bg-blue-800 border-none"
        >
          검색
        </Button>
      </div>
    </div>
  );
}
