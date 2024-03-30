import { useState } from "react";
import { Button } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";

import { changeInput } from "@/reducers/change";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [word, setWord] = useState("");

  const onChange = (e) => {
    setWord(e.target.value);
  };

  const onEnter = async (e) => {
    if (e.key === "Enter") {
      await setWord(e.target.value);
      await dispatch(changeInput(word));
      await setWord("");
    }
  };
  const onClick = () => {
    dispatch(changeInput(word));
    setWord("");
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
