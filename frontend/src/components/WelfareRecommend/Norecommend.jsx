import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Norecommend(props) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center my-[20vh] mx-[10vw] w-[80vw] h-[60vh]">
      <div className="box-border grid w-[200px] h-[300px] text-[#ffffff] mx-[2%] bg-blue-600 text-center rounded-[20px]">
        {props.profile === null ? (
          <img
            src="/blank-profile.png"
            alt="profile"
            className="w-[200px] h-[200px] object-cover rounded-tl-[20px] rounded-tr-[20px]"
          />
        ) : (
          <img
            src={props.profile}
            alt="profile"
            className="w-[200px] h-[200px] object-cover rounded-tl-[20px] rounded-tr-[20px]"
          />
        )}
        {props.name === null ? (
          <div className="mt-[1vh] mb-[1vh]">안녕하세요!</div>
        ) : (
          <div className="mt-[1vh] mb-[1vh] bg-blue-600 border-none rounded-xl">
            <div>안녕하세요!</div>
            <div>{props.name}님</div>
          </div>
        )}
      </div>
      <div className="box-border w-[50vw] h-[300px] bg-blue-600 m-0 mx-[2%] rounded-lg flex flex-col justify-center items-center">
        <h2 className="text-white text-xl font-bold">추천 복지가 없습니다.</h2>
        <br />
        <div>
          <Button
            className="bg-blue-800 border-none"
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
}
