import React, { useState, useEffect } from "react";
import "../Common.css";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
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

  const properties = {
    duration: 4000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
    pauseOnHover: true,
  };

  return (
    <div className="slide-container" style={{ height: "450px" }}>
      <Slide {...properties}>
        {media.map((m, idx) => {
          return (
            <div
              key={idx}
              style={{
                paddingTop: "10px",
                paddingLeft: "30px",
              }}
            >
              <img
                height="400"
                width="900"
                key={idx}
                src={m.mediaUrl}
                alt={m.title}
              />
            </div>
          );
        })}
      </Slide>
    </div>
  );
}

export default Banner;
