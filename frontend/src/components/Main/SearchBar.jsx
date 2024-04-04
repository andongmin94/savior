import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getAxios } from "@/api";
import { changeInput } from "@/reducers/change";

export default function SearchBar() {
  const axios = getAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState([]);
  const [activeKeywordIndex, setActiveKeywordIndex] = useState(0);
  const [word, setWord] = useState("");

  const search = (value) => {
    const keyword = value.trim();
    if (!keyword) return;

    dispatch(changeInput(keyword));
    navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    setWord("");
  };

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const request = await axios.get("/api/welfare/keyword");
        setKeywords(request.data.body.keywords.slice(0, 10));
      } catch {
        setKeywords([]);
      }
    };

    if (localStorage.getItem("token")) {
      fetchKeywords();
    }
  }, [axios]);

  useEffect(() => {
    if (keywords.length < 2) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveKeywordIndex((current) => (current + 1) % keywords.length);
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, [keywords.length]);

  const activeKeyword = keywords[activeKeywordIndex];

  return (
    <div className="searchBar">
      <div className="flex items-start">
        <div className="mb-[7px] flex w-[200px] flex-col">
          <div className="rounded-t-[3px] bg-white pl-[5%] text-[13px]">
            인기검색어
          </div>
          {activeKeyword ? (
            <button
              aria-label={`${activeKeywordIndex + 1}위 검색어 ${activeKeyword.keywordName}`}
              className="flex h-6 items-center rounded-b-[3px] bg-white px-[5%] text-left text-sm font-bold"
              onClick={() => search(activeKeyword.keywordName)}
              type="button"
            >
              <span className="mr-1 inline-block h-4 w-4 rounded-[2px] bg-blue-800 text-center text-xs leading-4 text-white">
                {activeKeywordIndex + 1}
              </span>
              <span className="truncate">{activeKeyword.keywordName}</span>
            </button>
          ) : (
            <div className="rounded-b-[3px] bg-white px-[5%] py-0">
              <strong>인기검색어가 없습니다.</strong>
            </div>
          )}
        </div>

        <Form.Control
          aria-label="복지 검색어"
          className="mb-0 ml-[0.5rem] mr-[0.4rem] mt-0 h-[45px] w-[1500px]"
          onChange={(event) => setWord(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") search(event.currentTarget.value);
          }}
          placeholder="검색어를 입력하세요"
          value={word}
        />
        <Button
          className="mb-0 ml-[0.5rem] mr-0 mt-0 h-[45px] w-20 border-none bg-blue-800"
          onClick={() => search(word)}
          type="button"
        >
          검색
        </Button>
      </div>
    </div>
  );
}
