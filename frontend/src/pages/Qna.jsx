import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Pagination, Table, Button, Container } from "react-bootstrap";

import { getAxios } from "@/api.js";
import Blank from "@/components/Qna/Blank";
import Write from "@/components/Qna/BlankWrite";
import LoginModal from "@/components/LoginModal";

function isLogin() {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  } else {
    return false;
  }
}

export default function Qna(props) {
  let navigate = useNavigate();
  let state = useSelector((state) => state);
  let [qnas, setQnas] = useState([]);
  const axios = getAxios();

  const fetchQnas = async () => {
    const request = await axios.get("/api/qna/mine/");

    const datas = request.data.body.success;
    setQnas([...datas]);
  };
  const checkLogin = () => {
    if (isLogin()) {
      fetchQnas();
    }
  };
  // const checkLogin = () => {
  //   if (!isLogin()) {
  //     // alert('로그인해주세요');
  //     // navigate(`/`);

  //   } else {
  //     fetchQnas();
  //   }
  // };
  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <Container>
      {isLogin() ? (
        <div className="mt-[5%] w-[80%] mx-auto pt-[15%] pb-[15%]">
          <h1 className="text-center">
            <strong>고객센터</strong>
          </h1>
          <div className='text-center'>
            궁금한 점이나 문의 사항을 남겨주세요.
          </div>

          <Link to="/QnaCreate">
            <span className="float-right mb-[1%]">
              <Button className="bg-blue-700 border-none">
                글쓰기
              </Button>{" "}
            </span>
          </Link>

          <Table striped bordered hover>
            <thead>
              <tr className="text-center">
                <th width="20%">번호</th>
                <th width="60%">제목</th>
                <th width="20%">등록일</th>
              </tr>
            </thead>

            {qnas.length === 0 ? (
              <tbody>
                <tr>
                  {/* <Blank></Blank> */}
                  <Write />
                  {/* <Blank></Blank> */}
                </tr>
              </tbody>
            ) : (
              <tbody>
                {qnas.map((a, i) => {
                  return (
                    <tr
                      key={i}
                      onClick={() => {
                        navigate(`/QnaDetail/${a.id}`);
                      }}
                      className="cursor-pointer"
                    >
                      <td className="text-center w-[20%]">{i + 1}</td>
                      <td className="text-center w-[60%]">{a.title}</td>
                      <td className="text-center w-[20%]">
                        {a.qna_created_at[0]}년 {a.qna_created_at[1]}월{" "}
                        {a.qna_created_at[2]}일
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </Table>
        </div>
      ) : (
        <LoginModal />
      )}
    </Container>
  );
}