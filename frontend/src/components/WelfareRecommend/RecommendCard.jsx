import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import styled from "styled-components";

function RecommendCard(props) {
  const { title, id, content } = props;
  let navigate = useNavigate();

  const onClick = () => {
    navigate(`/welfare/${id}`);
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
        background: "#E3F2FD",
      }}
    >
      <CardContent style={{ display: "grid" }}>
        <Grid container sx={{ mb: 2 }}>
          <Typography
            variant="h6"
            component="div"
            sx={10}
            style={{ color: "#033075", fontFamily: 'Pretendard' }}
          >
            <StyledLi>{title}</StyledLi>
          </Typography>
        </Grid>
        <StyledP>{content}</StyledP>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small" fullWidth onClick={onClick}>
          상세보기
        </Button>
      </CardActions>
    </Card>
  );
}
const StyledP = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-height: 1.5;
  height: 4.5em;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
`;
const StyledLi = styled.div`
  &:hover {
    text-decoration: none;
    display: inline;
    box-shadow: 0 -6px rgba(75, 112, 253, 0.3) inset;
  }
  cursor: pointer;
`;
export default RecommendCard;
