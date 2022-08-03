import "./Home.css";
import Team from "./team.jpg";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Typography, Stack, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [isDrawBox, setIsDrawBox] = useState(false);
  const [isSuggestBox, setIsSuggestBox] = useState(false);
  const [srcFileDefault, setSrcFileDefault] = useState("");
  const [linkFile, setLinkFile] = useState("");
  // file will upload
  const [srcFileHasCrop, setSrcFileHasCrop] = useState("");
  const [image, setImg] = useState(null);
  const [crop, setCrop] = useState({
    unit: "%",
    aspect: 8 / 16,
    width: 100,
  });
  const [coordinates, setCoordinates] = useState([]);
  const [isChooseSuggest, setIsChooseSuggest] = useState(false);
  let navigate = useNavigate();

  const rootElement = document.querySelectorAll(".item-suggest");
  if (rootElement) {
    for (let index = 0; index < rootElement.length; index++) {
      rootElement[index].addEventListener("click", function (el) {
        const i = rootElement[index].getBoundingClientRect();
        rootElement[index].style.border = `3px solid green`;

        // lấy ra các tọa độ như X1: i.x
        // lấy ra các tọa độ như Y1 : i.width
        // lấy ra các tọa độ như X2 : i.y
        // lấy ra các tọa độ như Y2 : i.height
        setCoordinates([i.x, i.width, i.y, i.height]);
        setIsChooseSuggest(true);
      });
    }
  }

  const createItem = (pX, pY, width, height) => {
    const rootElement = document.getElementById("suggest-box");

    const divElement = document.createElement("div");
    divElement.textContent = "";
    divElement.className = "item-suggest";
    divElement.style.position = "absolute";
    divElement.style.top = `${pX}px`;
    divElement.style.left = `${pY}px`;
    divElement.style.width = `${width}px`;
    divElement.style.height = `${height}px`;
    divElement.style.border = `3px solid #1976d2`;
    divElement.style.cursor = `pointer`;
    rootElement.append(divElement);
  };

  const removeItem = (id) => {
    const rootElement = document.querySelectorAll(".item-suggest");
    for (let index = 0; index < rootElement.length; index++) {
      if (rootElement[index]) {
        rootElement[index].remove();
      }
    }
  };

  const upLoadImg = (file) => {
    file.target &&
      file.target.files[0] &&
      setSrcFileDefault(URL.createObjectURL(file.target.files[0]));
    file.target.value = null;
  };

  const handleAddSuggestBox = async () => {
    setIsSuggestBox(!isSuggestBox);
    setIsDrawBox(false);

    //const res = await axios.get("http://localhost:5000/suggest-box");
    //if (res.status === 200) {
    // lấy dữ liệu từ res xuống
    // thực hiện for để lấy ra từng item > sau đó cho vô function createItem để có được suggest box
    //}
    createItem(20, 30, 100, 300);
    createItem(10, 900, 50, 200);
    createItem(60, 300, 20, 70);
  };

  const handleRemoveSuggestBox = () => {
    setIsSuggestBox(!isSuggestBox);
    removeItem(0);
    removeItem(1);
    removeItem(2);
  };

  const searchItem = async () => {
    if (srcFileDefault) {
      if (isChooseSuggest) {
        // drawBox(croppedImage); goi lenh api
        navigate("/result", { replace: true });
      } else {
        URL.revokeObjectURL(srcFileDefault);
        const croppedImage = await getCroppedImage(
          image,
          crop,
          "croppedImage.jpeg" // destination filename
        );
        navigate("/result", { replace: true });
        // drawBox(croppedImage); goi lenh api
      }
    }
    navigate("/result", { replace: true });
  };

  const drawBox = async (coordinates) => {
    try {
      const draw = await axios.post("http://localhost:5000/add-coordinates", {
        coordinates,
      });
      if (draw.status === 200) {
        // set laij link anh sau khi draw
        // setSrcFileDefault()
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function getCroppedImage(sourceImage, cropConfig, fileName) {
    // creating the cropped image from the source image
    const canvas = document.createElement("canvas");
    const scaleX = sourceImage?.naturalWidth / sourceImage?.width;
    const scaleY = sourceImage?.naturalHeight / sourceImage?.height;
    canvas.width = cropConfig?.width;
    canvas.height = cropConfig?.height;
    const ctx = canvas.getContext("2d");
    // New lines to be added
    const pixelRatio = window.devicePixelRatio;
    canvas.width = cropConfig.width * pixelRatio;
    canvas.height = cropConfig.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    const arr = [
      cropConfig.x * scaleX,
      cropConfig.width * scaleX,
      cropConfig.y * scaleY,
      cropConfig.height * scaleY,
    ];
    return arr;
  }

  const handleDraw = () => {
    setIsDrawBox(!isDrawBox);
    setIsSuggestBox(false);
  };

  return (
    <div className="header">
      <Typography
        variant="h5"
        component="h5"
        textAlign={"center"}
        sx={{ py: "10px" }}
      >
        Tim kiem nguoi dua tren anh
      </Typography>
      <Stack
        className="buttons"
        direction="row"
        justifyContent="space-between"
        alignItem="center"
      >
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="raised-button-file"
          type="file"
          onChange={(e) => upLoadImg(e)}
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span">
            Upload Image
          </Button>
        </label>
        {srcFileDefault && (
          <Button
            variant="contained"
            sx={{ backgroundColor: isSuggestBox ? "green" : "" }}
            onClick={
              isSuggestBox ? handleRemoveSuggestBox : handleAddSuggestBox
            }
          >
            {" "}
            View suggested Box
          </Button>
        )}

        <Button
          sx={{ backgroundColor: isDrawBox ? "green" : "" }}
          variant="contained"
          onClick={handleDraw}
        >
          DrawBox
        </Button>
        <Button variant="contained" onClick={searchItem}>
          Search
        </Button>
      </Stack>
      <div className="main">
        <div className="view-main">
          {isDrawBox && (
            <ReactCrop
              src={srcFileDefault}
              crop={crop}
              style={{
                width: "100%",
                margin: "0 auto",
              }}
              onImageLoaded={(newImg) => setImg(newImg)}
              onChange={(newCrop) => setCrop(newCrop)}
            />
          )}

          <div id="suggest-box">
            {!isDrawBox && (
              <img
                src={srcFileDefault}
                style={{
                  width: "100%",
                  margin: "0 auto",
                }}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
