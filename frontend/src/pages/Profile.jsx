import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

import { getAxios, getAxiosDjango } from "@/api";
import UserProfile from "@/components/Profile/UserProfile";
import FilterChips from "@/components/FilterChips";
import DeleteAccount from "@/components/Profile/DeleteAccount";
import { paginate } from "@/components/Search/paginate";

const ageMap = new Map();
ageMap.set("1", "어린이 (0~9)"); //무직
ageMap.set("2", "청소년 (10~19)"); //창업
ageMap.set("3", "청년 (20~29)"); //농어업인
ageMap.set("4", "중/장년 (30~59)"); //중소기업
ageMap.set("5", "노년 (60~)"); //일반

const PaginationBtn = (props) => {
  const { itemsCount, pageSize, onPageChange } = props;
  // 각각 복지목록 개수, 한 페이지에 보여줄 데이터개수,
  const pageCount = Math.ceil(itemsCount / pageSize); // 몇 페이지가 필요한지 계산
  if (pageCount === 1) return null; // 1페이지 뿐이라면 페이지네이션 안보이게
  // const pages = _.range(1, pageCount + 1); // 마지막 페이지에 보여줄 컨텐츠를 위해 +1
  return (
    <Stack spacing={2}>
      <Pagination
        count={pageCount}
        onClick={(e) => onPageChange(e.target.textContent)}
      />
    </Stack>
  );
};
export default function Profile() {
  const [userSeq, setUserSeq] = useState("");
  const [username, setUsername] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [ageRender, setAgeRender] = useState("");
  const [gender, setGender] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [liked, setLiked] = useState([]);
  const [used, setUsed] = useState([]);
  const [modify, setModify] = useState("false");
  const navigate = useNavigate();

  const [welLikes, setWelLikes] = useState({
    datal: "",
    pageSizel: 5, // 한 페이지에 보여줄 데이터 개수
    currentPagel: 1, // 현재 활성화된 페이지 위치
  });
  const [welUsed, setWelUsed] = useState({
    datau: "",
    pageSizeu: 5, // 한 페이지에 보여줄 데이터 개수
    currentPageu: 1, // 현재 활성화된 페이지 위치
  });

  const handlePageChangel = (page) => {
    setWelLikes({ ...welLikes, currentPagel: page });
  };
  const handlePageChangeu = (page) => {
    setWelUsed({ ...welUsed, currentPageu: page });
  };

  const { datal, pageSizel, currentPagel } = welLikes;
  const { datau, pageSizeu, currentPageu } = welUsed;
  const pagedWelLikes = paginate(datal, currentPagel, pageSizel); // 페이지 별로 데이터가 속한 배열을 얻어옴
  const pagedWelUsed = paginate(datau, currentPageu, pageSizeu); // 페이지 별로 데이터가 속한 배열을 얻어옴

  const getProfile = async () => {
    try {
      const axios = getAxios();
      let response = await axios.get("/api/users/profile");

      setUsername(localStorage.getItem("name"));
      setProfileImage(localStorage.getItem("profile"));
      setUserSeq(response.data.body.user.userSeq);

      if (response.data.body.user.profileImageUrl === null) {
        setProfileImage("/blank-profile.png");
      } else {
        setProfileImage(response.data.body.user.profileImageUrl);
      }

      if (response.data.body.user.ageRange === null) {
        setAgeRange("placeholder");
      } else {
        setAgeRange(response.data.body.user.ageRange);
        setAgeRender(ageMap.get(ageRange));
      }

      if (response.data.body.user.male === null) {
        setGender("placeholder");
      } else if (response.data.body.user.male === 1) {
        setGender("male");
      } else if (response.data.body.user.male === 0) {
        setGender("female");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const setProfile = async () => {
    try {
      const axios = getAxios();
      await axios.post("/api/users/update/profile", {
        age: ageRange,
        gender: gender,
      });
      setAgeRender(ageMap.get(ageRange));

      const djangoAxios = getAxiosDjango();
      let res = await djangoAxios.get(`/user/insert_dbscan/${userSeq}`);
    } catch (err) {
      console.log(err);
    }
  };

  const getLike = async () => {
    try {
      const axios = getAxios();
      let response = await axios.get("/api/users/like");
      setLiked(response.data.body.likeList);
      setWelLikes({ ...welLikes, datal: response.data.body.likeList });
    } catch (err) {
      console.log(err);
    }
  };

  const getUsed = async () => {
    try {
      const axios = getAxios();
      let response = await axios.get("/api/users/used");
      setUsed(response.data.body.usedWelfareList);
      setWelUsed({ ...welUsed, datau: response.data.body.usedWelfareList });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, [ageRender]);

  useEffect(() => {
    getLike();
    getUsed();
  }, []);

  const { length: countl } = datal;
  const { length: countu } = datau;

  return (
    <div>
      {typeof window.electron !== "undefined" && <div className="pt-16" />}
      <div className="flex justify-center text-black bg-[url('/background/waves.svg')] w-screen">
        <div className="flex flex-col justify-center m-[15%] my-0">
          <div className="m-[0%] mx-[5%] bg-opacity-50 rounded-md p-[3%] px-[5%]">
            <UserProfile
              modify={modify}
              setModify={setModify}
              setProfile={setProfile}
              profileImage={profileImage}
              username={username}
              ageRange={ageRange}
              ageRender={ageRender}
              setAgeRange={setAgeRange}
              gender={gender}
              setGender={setGender}
            ></UserProfile>

            <hr className="my-[3%] mx-0" />

            <div className="flex flex-col justify-center items-center p-[5%] my-0 mx-[5%] rounded-[5px] bg-[rgba(255,255,255,0.4)]">
              <h5>
                <strong>
                  회원님의 상황을 자세하게 설정하세요. 추천 복지 선택에 도움을
                  줍니다.
                </strong>
              </h5>
              <FilterChips />
            </div>

            <hr className="my-[3%] mx-0" />

            <div className="flex flex-wrap justify-evenly">
              <div className="h-[50vh] w-[400px] p-[1%] py-0 grid items-center grid-rows-[15%,70%,15%] bg-white bg-opacity-40 rounded-md">
                <h5 className="text-center mt-[0.5rem]">
                  <strong>찜한 복지</strong>
                </h5>
                {countl !== 0 ? (
                  <ListGroup variant="flush" className="py-0 px-[5%]">
                    {pagedWelLikes.map((wel) => (
                      <ListGroup.Item
                        key={wel.welfareId}
                        onClick={() => {
                          navigate(`/welfare/${wel.welfareId}`);
                        }}
                        className="bg-[rgba(255,255,255,0)]"
                      >
                        <h6 className="hover:underline cursor-pointer">
                          {wel.welfare_service_name}
                        </h6>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <div className="m-auto">찜한 복지가 없습니다.</div>
                )}
                <div className="mx-auto">
                  <PaginationBtn
                    itemsCount={countl}
                    pageSize={pageSizel}
                    onPageChange={handlePageChangel}
                  />
                </div>
              </div>
              <div className="h-[50vh] w-[400px] p-[1%] py-0 grid items-center grid-rows-[15%,70%,15%] bg-white bg-opacity-40 rounded-md">
                <h5 className="text-center mt-[0.5rem]">
                  <strong>사용 중인 복지</strong>
                </h5>

                {countu !== 0 ? (
                  <ListGroup variant="flush" className="py-0 px-[5%]">
                    {pagedWelUsed.map((wel) => (
                      <ListGroup.Item
                        key={wel.welfareId}
                        onClick={() => {
                          navigate(`/welfare/${wel.welfareId}`);
                        }}
                        className="bg-[rgba(255,255,255,0)]"
                      >
                        <h6 className="hover:underline cursor-pointer">
                          {wel.welfare_service_name}
                        </h6>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <div className="m-auto">사용중인 복지가 없습니다.</div>
                )}
                <div className="mx-auto">
                  <PaginationBtn
                    itemsCount={countu}
                    pageSize={pageSizeu}
                    onPageChange={handlePageChangeu}
                  />
                </div>
              </div>
            </div>

            <hr className="my-[3%] mx-0" />

            <div className="flex justify-end">
              <DeleteAccount />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
