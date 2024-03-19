import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Norecommend(props) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center my-[20vh] mx-[10vw] w-[80vw] h-[60vh]">
      <div className="box-border grid w-[200px] h-[300px] text-[#ffffff] mx-[2%] bg-[#fb923c] text-center rounded-[20px]">
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
      </div>
      <div className="box-border w-1/2 h-[300px] bg-[#fb923c] mx-[2%] rounded-lg flex flex-col justify-center items-center">
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
      </div>
    </div>
  );
};
