import React from "react";
import "../Common.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Banner(props) {
  return (
    <Carousel
      interval={5000}
      autoPlay={true}
      stopOnHover={true}
      emulateTouch={true}
      infiniteLoop={true}
      showArrows={true}
      showThumbs={false}
      dynamicHeight={false}
    >
      <div>
        <img
          height={props.height}
          src="/images/img_soccer.png"
          alt="main_image1"
        />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img height={props.height} src="/images/banner.jpg" alt="main_image2" />
        <p className="legend">Banner</p>
      </div>
      <div>
        <img
          height={props.height}
          src="http://lorempixel.com/output/cats-q-c-640-480-3.jpg"
          alt="main_image3"
        />
        <p className="legend">Legend 3</p>
      </div>
    </Carousel>
  );
}

export default Banner;
