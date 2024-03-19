import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { getAxios } from "@/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PaginationBtn from "@/components/Search/PaginationBtn";
import { paginate } from "@/components/Search/paginate";

export default function ResultBoard() {
  const axios = getAxios();
  const { keyword } = useSelector(state => state.change);
  const navigate = useNavigate();

  const [welfares, setWelfares] = useState({
    data: "",
    pageSize: 10, // 한 페이지에 보여줄 데이터 개수
    currentPage: 1, // 현재 활성화된 페이지 위치
  });

  const handlePageChange = page => {
    setWelfares({ ...welfares, currentPage: page });
    // console.log(page);
  };

  const { data, pageSize, currentPage } = welfares;
  const pagedWelfares = paginate(data, currentPage, pageSize); // 페이지 별로 데이터가 속한 배열을 얻어옴

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const request = await axios.get(`/api/welfare/search/${keyword}`);
        navigate(`/search?keyword=${keyword}`);
        setWelfares({ ...welfares, data: request.data });
        // console.log(request.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSearch();
  }, [keyword]);

  const onClick = id => {
    navigate(`/welfare/${id}`);
  };

  const { length: count } = data;
  if (count === 0) {
    return <div className="box-border w-1/2 h-1/2 rounded-lg border-solid border border-[#e9ecef] m-auto text-center font-bold leading-[50vh]">검색 정보가 없습니다 🔍</div>;
  }

  return (
    <div className="box-border w-1/2 flex flex-col mb-[5vh]">
      <div className="border border-[gray] p-4">
        <Table striped bordered hover>
          <thead className="text-center">
            <tr>
              <th width="10%">번호</th>
              <th width="70%">제목</th>
              <th width="20%">조회수</th>
            </tr>
          </thead>
          <tbody>
            {pagedWelfares.map(welfare => (
              <tr key={welfare[0]}>
                <td>{welfare[0]}</td>
                <td className="hover:underline cursor-pointer" onClick={e => onClick(welfare[0])}>
                  {welfare[1]}
                </td>
                <td>{welfare[2]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="m-auto mt-4">
        <PaginationBtn
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}