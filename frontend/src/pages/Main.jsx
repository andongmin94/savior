import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Tabs, Tab, ListGroup } from "react-bootstrap";

import { getAxios } from "@/api";
import SearchBar from "@/components/Main/SearchBar";
import FilterSlide from "@/components/WelfareRecommend/FilterSlide";

function isLogin() {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  } else {
    return false;
  }
}

export default function Main() {
  const KAKAO_AUTH_URL = `https://j10d109.p.ssafy.io/api/oauth2/authorization/kakao?redirect_uri=https://j10d109.p.ssafy.io/oauth/kakao/callback`;
  // const KAKAO_AUTH_URL = `http://localhost:8080/api/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/oauth/kakao/callback`;

  const axios = getAxios();
  let navigate = useNavigate();

  const [name, setName] = useState("User");
  const [selectfamilies, setSelectfamilies] = useState([{}]);
  const [selecttargets, setSelecttargets] = useState([{}]);
  const [popular, setPopular] = useState([{}]);
  const [token, setToken] = useState("");
  const [cards, setCards] = useState([]);
  const [keywords, setKeywords] = useState([]);

  const isLogin = () => {
    if (localStorage.getItem("token")) {
      setToken(true);
    } else {
      setToken(false);
    }
  };

  const getProfile = async () => {
    try {
      const axios = getAxios();
      let response = await axios.get("/api/users/profile");
      // console.log("카카오 : ", response.data);
      localStorage.setItem("name", response.data.body.user.username);
      localStorage.setItem("profile", response.data.body.user.profileImageUrl);
      await setName(localStorage.getItem("name"));
      await setSelectfamilies(response.data.body.user.selectfamilies);
      await setSelecttargets(response.data.body.user.selecttargets);
    } catch (err) {
      // console.log(err);
    }
  };

  const getPopular = async () => {
    try {
      let res = await axios.get("/api/welfare/popular");
      // console.log("인기순: ", res.data.body.welfare, typeof res.data.body.welfare);
      setPopular(res.data.body.welfare);
    } catch (error) {
      // console.log(error);
    }
  };

  const fetchCard = async () => {
    try {
      const request = await axios.get("/api/welfare/recommend");
      // console.log("welfare: ", request.data.body.welfare);
      setCards(request.data.body.welfare);
    } catch (err) {
      // console.log(err);
    }
  };

  const fetchWord = async () => {
    try {
      const request = await axios.get("/api/welfare/keyword");
      // console.log("keywords: ", request.data.body.keywords);
      setKeywords(request.data.body.keywords.slice(0, 10));
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    getPopular();
    fetchCard();
    fetchWord();
    isLogin();
    getProfile();
  }, []);

  return (
    <main>
      <div className="grid justify-center">
        <div className="flex flex-wrap flex-col p-[1%] px-[10%] bg-blue-500 w-screen text-black">
          <div className="flex flex-wrap flex-row mt-[100px] justify-around bg-blue-500">
            <div className="mt-[170px] text-white text-lg">
              <div>
                <b>만류귀종, 삶의 형태는 다양하지만 우리는 모두 동등하다.</b>
              </div>

              <br />

              <div className="mt-[10px]">
                세이비어는 이용자에게 맞춤 복지 정보를 제공합니다.
                <br />
                ‘세이비어’에 가입하고 본인에게 딱 맞는 복지제도 정보를
                찾아보세요.
              </div>

              {!token ? (
                <Button
                  href={KAKAO_AUTH_URL}
                  className="mt-[10px] bg-blue-800 border-none"
                >
                  카카오톡으로 시작하기
                </Button>
              ) : null}
            </div>
            <img src="Main-icon1.png" alt="main-image" width="400px" />
          </div>
        </div>

        <div className="w-screen h-screen relative bg-[url('/background/waves.svg')]">
          <br />
          <div className="mx-[10%] mb-[1%]">
            <SearchBar keywords={keywords} />
          </div>

          <div className="mx-[10%] my-[5%] mt-0 bg-white rounded-md p-[1%]">
            <Tabs
              defaultActiveKey="home"
              id="main-welfare-tab"
              className="mb-3"
            >
              <Tab eventKey="home" title="나에게 맞는 복지">
                {cards.length === 0 ||
                (selectfamilies == [] && selecttargets == []) ? (
                  <div className="flex justify-evenly items-center m-[2%] mx-0">
                    <img
                      src="Main-icon2.png"
                      alt="main-image"
                      className="w-[300px] transform scale-x[-1]"
                    />
                    <div className="flex flex-col justify-start">
                      <h3>
                        <strong>나의 상황에 알맞은 정보를 입력하여</strong>
                      </h3>
                      <h3>
                        <strong>
                          더욱 정확한 맞춤 복지 혜택을 추천받으세요.
                        </strong>
                      </h3>

                      <h5 className="mt-[10px]">
                        <strong>회원님의 상황을 자세히 선택할수록</strong>
                      </h5>
                      <h5>
                        <strong>
                          유용한 복지 혜택을 안내받을 수 있습니다.
                        </strong>
                      </h5>
                      <Button
                        className="mt-[5%] mr-[30%] mb-[5%] ml-0 bg-blue-800 border-none"
                        onClick={() => {
                          navigate("/filter");
                        }}
                      >
                        정보 입력하기
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="mt-[50px] ml-[60px] font-semibold mb-12">
                      {name}님에게 추천하는 복지
                    </h2>
                    <FilterSlide
                      name={name}
                      cards={cards}
                      className="w-[300px]"
                    />
                  </div>
                )}
              </Tab>

              <Tab eventKey="popular-list" title="많이 찾는 복지제도">
                <h5 className="py-[1%] px-[3%]">
                  <b>지금 인기있는 복지 혜택을 안내드립니다.</b>
                </h5>
                <ListGroup variant="flush">
                  {popular.map((item, index) => (
                    <ListGroup.Item key={index} className="flex items-center">
                      <div className="w-[300px] text-[13px] m-0 ml-[20px]">
                        <strong
                          className="hover:no-underline hover:inline hover:shadow-[0_-6px_rgba(75,112,253,0.3)_inset]"
                          onClick={() => {
                            navigate(`/welfare/${item.welfareId}`);
                          }}
                        >
                          {item.welfare_service_name}
                        </strong>
                      </div>
                      <div className="my-0 mx-[2%]" />
                      <strong
                        className="text-[13px] overflow-ellipsis whitespace-nowrap overflow-hidden w-[700px] m-0 ml-[20px] cursor-pointer"
                        onClick={() => {
                          navigate(`/welfare/${item.welfareId}`);
                        }}
                      >
                        {item.welfare_target_detail}
                      </strong>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
}
