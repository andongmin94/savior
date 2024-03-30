import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Button } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function RecommendCard(props) {
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
      <CardContent className='grid'>
        <Grid container sx={{ mb: 2 }}>
        <Typography
            onClick={onClick}
            component="div"
            sx={10}
            className='text-blue-800'
            fontFamily={'TmoneyRoundWind'}
          >
            <div className="hover:no-underline hover:inline cursor-pointer font-bold">
              {title}
            </div>
          </Typography>
        </Grid>
        <p
          className="overflow-hidden overflow-ellipsis whitespace-normal leading-[1.5] h-[4.5em] text-left break-words"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {content}
        </p>
      </CardContent>
      <CardActions>
        <Button className='bg-blue-700 border-none texd-white w-full' onClick={onClick}>
          상세보기
        </Button>
      </CardActions>
    </Card>
  );
}