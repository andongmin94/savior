import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewsTicker from "react-advanced-news-ticker";
import { getAxios } from "@/api";
import { changeInput } from "@/reducers/change";

function SearchBar() {
  const axios = getAxios();
  const dispatch = useDispatch();
  const [keywords, setKeywords] = useState([]);
  const [word, setWord] = useState("");
  const navigate = useNavigate();

  const onChange = e => {
    setWord(e.target.value);
  };

  const onEnter = async e => {
    if (e.key === "Enter") {
      // console.log(e);
      await setWord(e.target.value);
      await dispatch(changeInput(word));
      navigate(`/search?keyword=${word}`);
      await setWord("");
    }
  };

  const onClick = word => {
    // console.log(word);
    dispatch(changeInput(word));
    navigate(`/search?keyword=${word}`);
    setWord("");
  };

  useEffect(() => {
    const fetchWord = async () => {
      try {
        const request = await axios.get("/api/welfare/keyword");
        setKeywords(request.data.body.keywords.slice(0, 10));
        // console.log(request.data.body.keywords.slice(0, 10));
        // console.log(keywords[0].keywordName);
      } catch (err) {
        console.log(err);
      }
    };
    fetchWord();
  }, []);

  return (
    <div className="searchBar">
      <div className="flex items-center">
        <div className="flex flex-col mb-[7px]">
          <div
            style={{
              width: "200px",
              background: "white",
              fontFamily: 'Pretendard',
              fontSize: "13px",
              paddingLeft: "5%",
              borderRadius: "3px 3px 0 0",
            }}
          >
            인기검색어
          </div>
          {keywords.length === 10 ? (
            <NewsTicker
              rowHeight={24}
              rowWidth={80}
              maxRows={1}
              speed={600}
              duration={4000}
              autoStart={true}
              pauseOnHover={true}
              style={{
                width: "200px",
                padding: "0 5%",
                background: "white",
                borderRadius: "0 0 3px 3px ",
                fontFamily: 'Pretendard',
                listStyleType: "none",
                listStyle: "none",
              }}
            >
              <div onClick={e => onClick(keywords[0].keywordName)}>
                <strong>
                  <span
                    style={{
                      color: "white",
                      backgroundColor: "#0D6EFD",
                      display: "inline-block",
                      fontSize: ".75rem",
                      height: "16px",
                      lineHeight: "16px",
                      textAlign: "center",
                      width: "15px",
                      paddingBottom: "1px",
                      marginRight: "1px",
                      borderRadius: "2px",
                    }}
                  >
                    1
                  </span>

                  {keywords[0].keywordName}
                </strong>
              </div>
              <div onClick={e => onClick(keywords[1].keywordName)}>
                <strong>
                  <span
                    style={{
                      color: "white",
                      backgroundColor: "#0D6EFD",
                      display: "inline-block",
                      fontSize: ".75rem",
                      height: "16px",
                      lineHeight: "16px",
                      textAlign: "center",
                      width: "15px",
                      paddingBottom: "1px",
                      marginRight: "1px",
                      borderRadius: "2px",
                    }}
                  >
                    2
                  </span>

                  {keywords[1].keywordName}
                </strong>
              </div>
              <div onClick={e => onClick(keywords[2].keywordName)}>
                <strong>
                  {" "}
                  <span
                    style={{
                      color: "white",
                      backgroundColor: "#0D6EFD",
                      display: "inline-block",
                      fontSize: ".75rem",
                      height: "16px",
                      lineHeight: "16px",
                      textAlign: "center",
                      width: "15px",
                      paddingBottom: "1px",
                      marginRight: "1px",
                      borderRadius: "2px",
                    }}
                  >
                    3
                  </span>{" "}
                  {keywords[2].keywordName}
                </strong>
              </div>
              <div onClick={e => onClick(keywords[3].keywordName)}>
                <strong>
                  {" "}
                  <span
                    style={{
                      color: "white",
                      backgroundColor: "#0D6EFD",
                      display: "inline-block",
                      fontSize: ".75rem",
                      height: "16px",
                      lineHeight: "16px",
                      textAlign: "center",
                      width: "15px",
                      paddingBottom: "1px",
                      marginRight: "1px",
                      borderRadius: "2px",
                    }}
                  >
                    4
                  </span>{" "}
                  {keywords[3].keywordName}
                </strong>
              </div>
              <div onClick={e => onClick(keywords[4].keywordName)}>
                <strong>
                  {" "}
                  <span
                    style={{
                      color: "white",
                      backgroundColor: "#0D6EFD",
                      display: "inline-block",
                      fontSize: ".75rem",
                      height: "16px",
                      lineHeight: "16px",
                      textAlign: "center",
                      width: "15px",
                      paddingBottom: "1px",
                      marginRight: "1px",
                      borderRadius: "2px",
                    }}
                  >
                    5
                  </span>{" "}
                  {keywords[4].keywordName}
                </strong>
              </div>
              <div onClick={e => onClick(keywords[5].keywordName)}>
                <strong>
                  {" "}
                  <span
                    style={{
                      color: "white",
                      backgroundColor: "#0D6EFD",
                      display: "inline-block",
                      fontSize: ".75rem",
                      height: "16px",
                      lineHeight: "16px",
                      textAlign: "center",
                      width: "15px",
                      paddingBottom: "1px",
                      marginRight: "1px",
                      borderRadius: "2px",
                    }}
                  >
                    6
                  </span>
                  {keywords[5].keywordName}
                </strong>
              </div>
              <div onClick={e => onClick(keywords[6].keywordName)}>
                <strong>
                  {" "}
                  <span
                    style={{
                      color: "white",
                      backgroundColor: "#0D6EFD",
                      display: "inline-block",
                      fontSize: ".75rem",
                      height: "16px",
                      lineHeight: "16px",
                      textAlign: "center",
                      width: "15px",
                      paddingBottom: "1px",
                      marginRight: "1px",
                      borderRadius: "2px",
                    }}
                  >
                    7
                  </span>
                  {keywords[6].keywordName}
                </strong>
              </div>
              <div onClick={e => onClick(keywords[7].keywordName)}>
                <strong>
                  {" "}
                  <span
                    style={{
                      color: "white",
                      backgroundColor: "#0D6EFD",
                      display: "inline-block",
                      fontSize: ".75rem",
                      height: "16px",
                      lineHeight: "16px",
                      textAlign: "center",
                      width: "15px",
                      paddingBottom: "1px",
                      marginRight: "1px",
                      borderRadius: "2px",
                    }}
                  >
                    8
                  </span>{" "}
                  {keywords[7].keywordName}
                </strong>
              </div>
              <div onClick={e => onClick(keywords[8].keywordName)}>
                <strong>
                  {" "}
                  <span
                    style={{
                      color: "white",
                      backgroundColor: "#0D6EFD",
                      display: "inline-block",
                      fontSize: ".75rem",
                      height: "16px",
                      lineHeight: "16px",
                      textAlign: "center",
                      width: "15px",
                      paddingBottom: "1px",
                      marginRight: "1px",
                      borderRadius: "2px",
                    }}
                  >
                    9
                  </span>{" "}
                  {keywords[8].keywordName}
                </strong>
              </div>
              <div onClick={e => onClick(keywords[9].keywordName)}>
                <strong>
                  {" "}
                  <span
                    style={{
                      color: "white",
                      backgroundColor: "#0D6EFD",
                      display: "inline-block",
                      fontSize: ".75rem",
                      height: "16px",
                      lineHeight: "16px",
                      textAlign: "center",
                      width: "15px",
                      paddingBottom: "1px",
                      marginRight: "1px",
                      borderRadius: "2px",
                    }}
                  >
                    10
                  </span>{" "}
                  {keywords[9].keywordName}
                </strong>
              </div>
            </NewsTicker>
          ) : (
            <div
              style={{
                width: "200px",
                padding: "0 5%",
                background: "white",
                borderRadius: "0 0 3px 3px ",
                fontFamily: 'Pretendard'
              }}
            >
              <strong>인기검색어가 없습니다.</strong>
            </div>
          )}
        </div>

        <Form.Control
          className="me-auto"
          placeholder="검색어를 입력하세요"
          onKeyDown={onEnter}
          onChange={onChange}
          value={word}
          style={{
            width: "1500px",
            height: "45px",
            margin: "0 0.5rem 0.4rem 0.5rem",
          }}
        />
        <Button
          type="submit"
          onClick={onClick}
          style={{
            width: "80px",
            height: "45px",
            margin: "0 0 0.4rem 0.5rem",
            backgroundColor: "#ea580c",
            borderColor: "#ea580c",
          }}
        >
          검색
        </Button>
      </div>
    </div>
  );
}

export default SearchBar;
