import React from "react";
import main from "./img.png"; // Tell Webpack this JS file uses this image

function BannerImage(props) {
  // Import result is the URL of your image
  return (
    <img
      className={props.className}
      src={main}
      alt="main_image"
      width={props.width}
      height={props.height}
    />
  );
}

export default BannerImage;
