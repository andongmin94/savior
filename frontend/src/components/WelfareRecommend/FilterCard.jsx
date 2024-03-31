import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Button } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function FilterCard(props) {
  const { name, content, id } = props;
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
      <CardContent className="grid">
        <Grid container sx={{ mb: 2 }}>
          <Typography
            onClick={onClick}
            component="div"
            sx={{width: "10", height: "10"}}
            className="text-blue-800"
            fontFamily={"TmoneyRoundWind"}
          >
            <div className="cursor-pointer hover:no-underline font-bold">
              {name}
            </div>
          </Typography>
        </Grid>
        <div
          className="overflow-hidden text-ellipsis whitespace-normal leading-[1.5] h-[4.5em] text-left break-words"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {content}
        </div>
      </CardContent>
      <CardActions>
        <Button
          className="bg-blue-700 border-none texd-white w-full"
          onClick={onClick}
        >
          상세보기
        </Button>
      </CardActions>
    </Card>
  );
}
