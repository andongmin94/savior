import React, { useEffect, useState } from "react";
import { Pagination, Table, Button, Container } from "react-bootstrap";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { getAxios } from "@/api.js";
import Blank from "@/components/Qna/Blank";
import Write from "@/components/Qna/BlankWrite";
import LoginModal from "@/components/LoginModal";
let TablePlace = styled.div`
  margin-top: 5%;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 15%;
  padding-bottom: 15%;
`;
let Title = styled.h1`
  text-align: center;
`;
let WriteButton = styled.span`
  float: right;
  margin-bottom: 1%;
`;

let 표내용 = styled.tr`
  text-align: center;
`;
let 중앙정렬 = styled.td`
  text-align: center;
`;

function isLogin() {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  } else {
    return true;
  }
}
function Qna(props) {
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
        <TablePlace>
          <Title>
            <strong>고객센터</strong>
          </Title>
          <div style={{ textAlign: "center" }}>
            궁금한 점이나 문의 사항을 남겨주세요.
          </div>

          <Link to="/QnaCreate">
            <WriteButton>
              <Button
                style={{
                  backgroundColor: "#ea580c",
                  borderColor: "#ea580c",
                }}
              >
                글쓰기
              </Button>{" "}
            </WriteButton>
          </Link>

          <Table striped bordered hover>
            <thead>
              <표내용>
                <th width="20%">번호</th>
                <th width="60%">제목</th>
                <th width="20%">등록일</th>
              </표내용>
            </thead>

            {qnas.length === 0 ? (
              <tbody>
                <tr>
                  {/* <Blank></Blank> */}
                  <Write></Write>
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
                      style={{ cursor: "pointer" }}
                    >
                      <중앙정렬 width="20%">{i + 1}</중앙정렬>
                      <중앙정렬 width="60%">{a.title}</중앙정렬>
                      <중앙정렬 width="20%">
                        {a.qna_created_at[0]}년 {a.qna_created_at[1]}월{" "}
                        {a.qna_created_at[2]}일
                      </중앙정렬>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </Table>
        </TablePlace>
      ) : (
        <LoginModal></LoginModal>
      )}
    </Container>
  );
}

export default Qna;
