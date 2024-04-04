import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import SearchBar from "@/components/Search/SearchBar";
import Keyword from "@/components/Search/Keyword";
import ResultBoard from "@/components/Search/ResultBoard";
import { changeInput } from "@/reducers/change";

export default function Search() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";

  useEffect(() => {
    dispatch(changeInput(keyword));
  }, [dispatch, keyword]);

  return (
    <div className="grid justify-center pt-[30px] mt-[12vh]">
      <h2 className="font-bold">통합검색</h2>
      <SearchBar keyword={keyword} />
      <div className="flex justify-between pt-[5vh]">
        <ResultBoard />
        <Keyword />
      </div>
    </div>
  );
}
