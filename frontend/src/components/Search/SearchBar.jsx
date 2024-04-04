import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { changeInput } from "@/reducers/change";

export default function SearchBar({ keyword = "" }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [word, setWord] = useState(keyword);

  useEffect(() => {
    setWord(keyword);
  }, [keyword]);

  const onChange = (e) => {
    setWord(e.target.value);
  };

  const search = (keyword) => {
    const normalizedKeyword = keyword.trim();
    dispatch(changeInput(normalizedKeyword));
    navigate(`/search?keyword=${encodeURIComponent(normalizedKeyword)}`);
    setWord(normalizedKeyword);
  };

  const onEnter = (e) => {
    if (e.key === "Enter") {
      search(e.currentTarget.value);
    }
  };
  const onClick = () => {
    search(word);
  };

  return (
    <div className="box-border flex mt-8 justify-center items-center h-24 rounded-sm bg-blue-600">
      <div className="flex h-12 justify-center">
        <input
          type="text"
          size="50"
          placeholder="검색어를 입력하세요"
          onKeyDown={onEnter}
          onChange={onChange}
          value={word}
          className="rounded-l-sm w-96 h-12 pl-4"
        />
        <Button
          className="bg-blue-800 border-none rounded-l-none"
          type="submit"
          onClick={onClick}
        >
          <BsSearch className="text-white" />
        </Button>
      </div>
    </div>
  );
}
