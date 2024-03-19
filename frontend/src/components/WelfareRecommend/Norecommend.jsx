import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "react-bootstrap";

const Norecommend = (props) => {
  const navigate = useNavigate();
  return (
    <StyledContainer>
      <StyledProfile>
        {props.profile === null ? (
          <img
            src="/blank-profile.png"
            alt="profile"
            style={{
              width: "200px",
              height: "200px%",
              objectFit: "cover",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          ></img>
        ) : (
          <img
            src={props.profile}
            alt="profile"
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          ></img>
        )}
        {props.name === null ? (
          <div
          style={{
            marginTop: "1vh",
            marginBottom: "1vh",
          }}
        >
            안녕하세요!
          </div>
        ) : (
          <div
            style={{
              marginTop: "1vh",
              marginBottom: "1vh",
              backgroundColor: "#ea580c",
              borderColor: "#ea580c",
            }}
          >
            <div>안녕하세요!</div>
            <div>{props.name}님</div>
          </div>
        )}
      </StyledProfile>
      <StyledBox>
        <h2 style={{ color: "#ffffff" }}>추천 복지가 없습니다.</h2>
        <div>
          <Button
            style={{
              backgroundColor: "#ea580c",
              borderColor: "#ea580c",
            }}
            onClick={() => {
              navigate("/filter");
            }}
          >
            맞춤필터 설정하러가기
          </Button>
        </div>
      </StyledBox>
    </StyledContainer>
  );
};
const StyledProfile = styled.div`
  box-sizing: border-box;
  text-align: center;
  display: grid;
  border-radius: 20px;
  background-color: #fb923c;
  width: 200px;
  height: 300px;
  margin: 0 2%;
  color: #ffffff;
`;
const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20vh 10vw;
  width: 80vw;
  height: 60vh;
`;

const StyledBox = styled.div`
  box-sizing: border-box;
  width: 50vw;
  height: 300px;
  background: #fb923c;
  margin: 0 2%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export default Norecommend;
