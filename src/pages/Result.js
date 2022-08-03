import "./Result.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const [listImg, setListImg] = useState([]);
  const navigate = useNavigate();
  const [defaultImg, setDefaultImg] = useState(
    "https://taimienphi.vn/tmp/cf/aut/anh-gai-xinh-1.jpg"
  );

  // Khi có dữ liệu sẽ mở cái này ra để gọi
  // useEffect(() => {
  //   return new Promise(async() => {
  //     try {
  //       const res = await axios.get('http://localhost:5000/result');
  //       if (res.status) {
  //         setListImg('du lieu tra ve')
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })
  // },[])

  // sau khi cos api thì xóa code dưới đây tù dòng 36 => 62
  useEffect(() => {
    setListImg([
      {
        id: 1,
        img: "https://taimienphi.vn/tmp/cf/aut/anh-gai-xinh-1.jpg",
        name: "Ảnh 1",
        description: "Mô tả 1",
      },
      {
        id: 2,
        img: "https://taimienphi.vn/tmp/cf/aut/anh-gai-xinh-1.jpg",
        name: "Ảnh 2",
        description: "Mô tả 2",
      },
      {
        id: 3,
        img: "https://taimienphi.vn/tmp/cf/aut/anh-gai-xinh-1.jpg",
        name: "Ảnh 3",
        description: "Mô tả 3",
      },
      {
        id: 4,
        img: "https://taimienphi.vn/tmp/cf/aut/anh-gai-xinh-1.jpg",
        name: "Ảnh 4",
        description: "Mô tả 4",
      },
      {
        id: 5,
        img: "https://taimienphi.vn/tmp/cf/aut/anh-gai-xinh-1.jpg",
        name: "Ảnh 5",
        description: "Mô tả 5",
      },
    ]);
  }, []);

  const handleRedirect = () => {
    navigate("/", { replace: true });
  };

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
        src={defaultImg}
        alt=""
      />
      <Typography variant="h5" component="h5" sx={{ py: "10px" }}>
        Ket Qua Trich Xuat Du Lieu
      </Typography>
      <Stack direction="row" justifyContent="center" alignItem="center">
        {listImg.map((item) => (
          <Card key={item.id} sx={{ maxWidth: 345, margin: "0 10px" }}>
            <CardMedia
              component="img"
              height="300"
              image={item.img}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
      <Button onClick={handleRedirect} variant="contained" sx={{ mt: "10px" }}>
        Back
      </Button>
    </div>
  );
};

export default Result;
