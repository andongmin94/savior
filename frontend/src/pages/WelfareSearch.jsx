import SearchBar from "@/components/Search/SearchBar";
import Keyword from "@/components/Search/Keyword";
import ResultBoard from "@/components/Search/ResultBoard";

export default function Search() {
  return (
    <div className="grid justify-center pt-[30px] mt-[12vh]">
      <h2 className="font-bold">통합검색</h2>
      <SearchBar />
      <div className="flex justify-between pt-[5vh]">
        <ResultBoard />
        <Keyword />
      </div>
    </div>
  );
}
