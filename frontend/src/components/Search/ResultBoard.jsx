import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getAxios } from "@/api";
import { paginate } from "@/components/Search/paginate";
import PaginationBtn from "@/components/Search/PaginationBtn";

function isLogin() {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  } else {
    return false;
  }
}

export default function ResultBoard() {
  const axios = getAxios();
  const { keyword } = useSelector((state) => state.change);
  const navigate = useNavigate();

  const [welfares, setWelfares] = useState({
    data: [],
    pageSize: 10, // 한 페이지에 보여줄 데이터 개수
    currentPage: 1, // 현재 활성화된 페이지 위치
  });

  const handlePageChange = (page) => {
    setWelfares((current) => ({ ...current, currentPage: page }));
  };

  const { data, pageSize, currentPage } = welfares;
  const pagedWelfares = paginate(data, currentPage, pageSize); // 페이지 별로 데이터가 속한 배열을 얻어옴

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        if (isLogin()) {
          const request = await axios.get(
            `/api/welfare/search/${encodeURIComponent(keyword)}`,
          );
          setWelfares((current) => ({
            ...current,
            data: request.data,
            currentPage: 1,
          }));
        }
      } catch (err) {
        // console.log(err);
      }
    };
    fetchSearch();
  }, [axios, keyword]);

  const onClick = (id) => {
    navigate(`/welfare/${id}`);
  };

  const { length: count } = data;
  if (count === 0) {
    return (
      <div className="box-border w-[50vw] h-[50vh] rounded-lg border-solid border border-[#e9ecef] m-auto text-center font-bold leading-[50vh]">
        검색 정보가 없습니다 🔍
      </div>
    );
  }

  return (
    <div className="box-border w-[50vw] flex flex-col mb-[5vh]">
      <div className="box-border border-t-[1px] border-t-[solid] border-t-[gray] border-b-[1px] border-b-[solid] border-b-[gray]">
        <Table striped bordered hover>
          <thead className="text-center">
            <tr>
              <th width="10%">번호</th>
              <th width="70%">제목</th>
              <th width="20%">조회수</th>
            </tr>
          </thead>
          <tbody>
            {pagedWelfares.map((welfare) => (
              <tr key={welfare[0]}>
                <td>{welfare[0]}</td>
                <td>
                  <button
                    className="text-left hover:underline"
                    onClick={() => onClick(welfare[0])}
                    type="button"
                  >
                    {welfare[1]}
                  </button>
                </td>
                <td>{welfare[2]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="mx-auto mt-[10px]">
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
