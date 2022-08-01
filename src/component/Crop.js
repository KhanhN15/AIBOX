import { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";

function CropImg({ open, src, ...other }) {
  const [image, setImg] = useState(null);
  const [crop, setCrop] = useState({
    unit: "%",
    aspect: 1 / 1,
    width: 100,
  });

  const handleClose = () => {
    return other.handleClose(false);
  };

  async function handleCropImg() {
    // revoke img when haven't crop
    URL.revokeObjectURL(src);
    const croppedImage = await getCroppedImage(
      image,
      crop,
      "croppedImage.jpeg" // destination filename
    );
    other.setResultUrl(croppedImage, URL.createObjectURL(croppedImage)); // setResult about file and link
    handleClose();
  }

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

    ctx.drawImage(
      sourceImage,
      cropConfig.x * scaleX,
      cropConfig.y * scaleY,
      cropConfig.width * scaleX,
      cropConfig.height * scaleY,
      0,
      0,
      cropConfig.width,
      cropConfig.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }

        let file = new File([blob], fileName, { type: "image/jpeg" });
        resolve(file);
      }, "image/jpeg");
    });
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} sx={{ zIndex: "2005" }}>
        <DialogContent>
          <ReactCrop
            src={src}
            crop={crop}
            onImageLoaded={(newImg) => setImg(newImg)}
            onChange={(newCrop) => setCrop(newCrop)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleCropImg} autoFocus variant="outlined">
            Crop
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CropImg;
