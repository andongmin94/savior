import { useState } from "react";
import { Button, Stack } from "react-bootstrap";

import AlertModal from "@/components/AlertModal";
import ModifyProfile from "@/components/Profile/Modify";

const genderMap = new Map();
genderMap.set("female", "여자");
genderMap.set("male", "남자");

export default function UserProfile({
  modify,
  setModify,
  setProfile,
  profileImage,
  username,
  ageRange,
  ageRender,
  setAgeRange,
  gender,
  setGender,
}) {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const handleShow = () => setShow(true);

  return (
    <div>
      {modify === "false" ? (
        <div className="flex justify-center items-center mt-[3%]">
          <img
            src={profileImage}
            className="w-[110px] h-[110px] rounded-[70%] overflow-hidden"
          ></img>
          <div className="flex flex-col ml-[20px]">
            <h5>
              <b> {username}님 안녕하세요!</b>
            </h5>
            <h6>
              <b>
                연령대:{" "}
                {ageRange === "placeholder"
                  ? "수정 버튼을 눌러 정보를 입력해주세요"
                  : ageRender}
              </b>
            </h6>

            <h6>
              <b>
                성별:
                {gender === "placeholder"
                  ? "수정 버튼을 눌러 정보를 입력해주세요"
                  : genderMap.get(gender)}
              </b>
            </h6>

            <Button
              size="sm"
              className="w-[80px] bg-[#ea580c] border-[#ea580c]"
              onClick={() => {
                setModify("ture");
              }}
            >
              수정
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center mt-[3%]">
          <img
            src={profileImage}
            className="w-[110px] h-[110px] rounded-[70%] overflow-hidden"
          />
          <div 
            className="flex flex-col ml-[20px]">
            <h5>
              <b> {username}님 안녕하세요!</b>
            </h5>
            <ModifyProfile
              ageRange={ageRange}
              setAgeRange={setAgeRange}
              gender={gender}
              setGender={setGender}
            ></ModifyProfile>

            <Button
              variant="primary"
              size="sm"
              className="w-20"
              onClick={() => {
                setModify("false");
                setProfile();
                setText("정보 입력이 완료되었습니다.");
                handleShow();
              }}
            >
              저장
            </Button>
          </div>
        </div>
      )}
      <AlertModal text={text} show={show} setShow={setShow}></AlertModal>
    </div>
  );
};
