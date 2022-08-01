import "./Result.css";

import {
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Stack,
} from "@mui/material";

const Result = () => {
  return (
    <div className="result">
      <Typography variant="h5" component="h5" sx={{ py: "10px" }}>
        Hinh anh doi tuong
      </Typography>
      <img
        style={{
          height: "200px",
          width: "200px",
          objectFit: "cover",
        }}
        src="https://taimienphi.vn/tmp/cf/aut/anh-gai-xinh-1.jpg"
        alt=""
      />
      <Typography variant="h5" component="h5" sx={{ py: "10px" }}>
        Ket Qua Trich Xuat Du Lieu
      </Typography>
      <Stack direction="row" justifyContent="center" alignItem="center">
        <Card sx={{ maxWidth: 345, margin: "0 10px" }}>
          <CardMedia
            component="img"
            height="300"
            image="https://taimienphi.vn/tmp/cf/aut/anh-gai-xinh-1.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 345, margin: "0 10px" }}>
          <CardMedia
            component="img"
            height="300"
            image="https://taimienphi.vn/tmp/cf/aut/anh-gai-xinh-1.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 345, margin: "0 10px" }}>
          <CardMedia
            component="img"
            height="300"
            image="https://taimienphi.vn/tmp/cf/aut/anh-gai-xinh-1.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </Card>
      </Stack>
      <Button variant="contained" sx={{ mt: "10px" }}>
        Back
      </Button>
    </div>
  );
};

export default Result;
