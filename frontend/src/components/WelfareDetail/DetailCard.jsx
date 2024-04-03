import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { yellow, grey } from "@mui/material/colors";
import Grid from "@mui/material/Grid";

import { getAxios } from "@/api";
import AlertModal from "@/components/AlertModal";

export default function DetailCard(props) {
  const { used, like } = useSelector((state) => state.likeused);
  const [likeBtn, setLikeBtn] = useState(false);
  const welfare = props.recommend;
  const likeNum = props.likeNum;
  const welfareId = welfare[0];
  const axios = getAxios();
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const handleShow = () => setShow(true);

  const likeAxios = async () => {
    try {
      const request = await axios.put(`/api/users/like/${welfareId}`);
      // console.log(request.data);
    } catch (err) {
      console.log(err);
    }
  };
  const unlikeAxios = async () => {
    try {
      const request = await axios.delete(`/api/users/like/${welfareId}`);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (like !== undefined) {
      if (like.length !== 0) {
        like.includes(welfareId) ? setLikeBtn(true) : setLikeBtn(false);
      }
    }
  }, [like]);

  let navigate = useNavigate();

  const handleClick = () => {
    navigate(`/welfare/${welfareId}`);
    // console.log("클릭");
    window.location.reload();
  };

  return (
    <Card
      sx={{
        width: 275,
        height: 250,
        pl: 2,
        pr: 2,
        display: "grid",
        gridTemplateRows: "80% 20%",
        fontFamily: "TmoneyRoundWind",
      }}
    >
      <CardContent className="grid">
        <Grid container sx={{ mb: 2 }}>
          <Grid item xs={10}>
            <div className="font-bold text-md text-blue-800">{welfare[1]}</div>
          </Grid>
          {likeNum !== undefined ? (
            <Grid item xs={2}>
              {likeBtn ? (
                <StarRoundedIcon
                  sx={{ color: yellow[600], fontSize: 30 }}
                  onClick={() => {
                    setLikeBtn(false);
                    unlikeAxios();
                    // alert('찜해제했습니다.');
                    setText("찜한 복지 목록에서 삭제되었습니다. ");
                    handleShow();
                  }}
                />
              ) : (
                <StarBorderRoundedIcon
                  sx={{ color: grey[400], fontSize: 30 }}
                  onClick={() => {
                    setLikeBtn(true);
                    likeAxios();
                    // alert("찜했습니다.");
                    setText("찜한 복지 목록에 등록되었습니다. ");
                    handleShow();
                  }}
                />
              )}
              <AlertModal
                text={text}
                show={show}
                setShow={setShow}
              ></AlertModal>
            </Grid>
          ) : (
            <div></div>
          )}
        </Grid>
        <p
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
          className="overflow-hidden overflow-ellipsis whitespace-normal leading-[1.5] h-[4.5em] text-left break-words"
        >
          {welfare[2]}
        </p>
      </CardContent>
      <CardActions>
        <Button
          className="bg-blue-700 border-none texd-white w-full"
          onClick={handleClick}
        >
          상세보기
        </Button>
      </CardActions>
    </Card>
  );
}
