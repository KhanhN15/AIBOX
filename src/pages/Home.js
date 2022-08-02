import "./Home.css";
import Team from "./team.jpg";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Typography, Stack, Button } from "@mui/material";
import { useState, useEffect } from "react";

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
    aspect: 1 / 1,
    width: 100,
  });

  const rootElement = document.querySelectorAll(".item-suggest");
  if (rootElement) {
    for (let index = 0; index < rootElement.length; index++) {
      rootElement[index].addEventListener("click", function (el) {
        const i = rootElement[index].getBoundingClientRect();
        rootElement[index].style.border = `3px solid green`;
        console.log("====================================");
        console.log(i);
        console.log("====================================");
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

  const handleAddSuggestBox = () => {
    setIsSuggestBox(!isSuggestBox);

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
    URL.revokeObjectURL(srcFileDefault);
    const croppedImage = await getCroppedImage(
      image,
      crop,
      "croppedImage.jpeg" // destination filename
    );
    // file , link
    setSrcFileHasCrop(croppedImage);
    setLinkFile(URL.createObjectURL(croppedImage));
  };

  function getCroppedImage(sourceImage, cropConfig, fileName) {
    // creating the cropped image from the source image
    const canvas = document.createElement("canvas");
    const scaleX = sourceImage.naturalWidth / sourceImage.width;
    const scaleY = sourceImage.naturalHeight / sourceImage.height;
    canvas.width = cropConfig.width;
    canvas.height = cropConfig.height;
    const ctx = canvas.getContext("2d");
    // New lines to be added
    const pixelRatio = window.devicePixelRatio;
    canvas.width = cropConfig.width * pixelRatio;
    canvas.height = cropConfig.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    console.log("====================================");
    console.log("x", cropConfig.x * scaleX);
    console.log("Y", cropConfig.y * scaleY);
    console.log("width", cropConfig.width * scaleX);
    console.log("height", cropConfig.height * scaleY);
    console.log("====================================");

    // return canvas;

    // ctx.drawImage(
    //   sourceImage,
    //   cropConfig.x * scaleX,
    //   cropConfig.y * scaleY,
    //   cropConfig.width * scaleX,
    //   cropConfig.height * scaleY,
    //   0,
    //   0,
    //   cropConfig.width,
    //   cropConfig.height
    // );

    // return new Promise((resolve, reject) => {
    //   canvas.toBlob((blob) => {
    //     if (!blob) {
    //       reject(new Error("Canvas is empty"));
    //       return;
    //     }

    //     let file = new File([blob], fileName, { type: "image/jpeg" });
    //     resolve(file);
    //   }, "image/jpeg");
    // });
  }

  console.log(srcFileHasCrop);

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
        <Button
          variant="contained"
          sx={{ backgroundColor: isSuggestBox ? "" : "green" }}
          onClick={isSuggestBox ? handleAddSuggestBox : handleRemoveSuggestBox}
        >
          {" "}
          View suggested Box
        </Button>
        <Button variant="contained" onClick={() => setIsDrawBox(!isDrawBox)}>
          DrawBox
        </Button>
        <Button variant="contained" onClick={searchItem}>
          Search
        </Button>
      </Stack>
      <div className="view-main">
        {isDrawBox && (
          <ReactCrop
            src={srcFileDefault}
            crop={crop}
            style={{
              height: "800px",
              objectFit: "cover",
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
                height: "800px",
                objectFit: "cover",
                margin: "0 auto",
              }}
              alt=""
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
