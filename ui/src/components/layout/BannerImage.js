import React from "react";
import main from "./img.jpg";
import "../Common.css";

function BannerImage(props) {
  return (
    <div className="banner">
      <img
        className={props.className}
        src={main}
        alt="main_image"
        width={props.width}
        height={props.height}
      />
    </div>
  );
}

export default BannerImage;
