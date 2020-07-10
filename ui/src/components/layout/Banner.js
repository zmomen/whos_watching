import React, { useState, useEffect } from "react";
import "../Common.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getAllMedia } from "../../utils/api";

function Banner(props) {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    getAllMedia()
      .then(({ data }) => {
        setMedia(data);
      })
      .catch((err) => console.warn("error", err));
  }, []);
  return (
    <Carousel
      interval={4000}
      autoPlay={true}
      stopOnHover={true}
      emulateTouch={true}
      infiniteLoop={true}
      showArrows={true}
      showThumbs={false}
      dynamicHeight={false}
    >
      {media.map((m, idx) => {
        return (
          <div>
            <img height={props.height} src={m.mediaUrl} alt={m.title} />
            <p className="legend">{m.title}</p>
          </div>
        );
      })}

      <div>
        <img height={props.height} src="/images/banner.jpg" alt="main_image2" />
        <p className="legend">Banner</p>
      </div>
    </Carousel>
  );
}

export default Banner;
