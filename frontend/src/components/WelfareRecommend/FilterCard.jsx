import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

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
        display: 'grid',
        gridTemplateRows: '80% 20%',
        background: '#E3F2FD',
      }}
    >
      <CardContent style={{ display: 'grid' }}>
        <Grid container sx={{ mb: 2 }}>
          <Typography
            onClick={onClick}
            variant="h6"
            component="div"
            sx={10}
            style={{ color: '#033075', fontFamily: 'Pretendard' }}
          >
            <div className="cursor-pointer hover:no-underline" style={{ boxShadow: '0 -6px rgba(75, 112, 253, 0.3) inset' }}>
              {name}
            </div>
          </Typography>
        </Grid>
        <div
          className="overflow-hidden text-ellipsis whitespace-normal leading-[1.5] h-[4.5em] text-left break-words"
          style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
          {content}
        </div>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small" fullWidth onClick={onClick}>
          상세보기
        </Button>
      </CardActions>
    </Card>
  );
}