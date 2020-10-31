import React, { useContext, useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { getAllMedia } from "../../utils/api";
import { Context } from "../../utils/Store";
import "../Common.css";

function Banner(props) {
  const [media, setMedia] = useState([]);
  const [state] = useContext(Context);

  useEffect(() => {
    getAllMedia()
      .then(({ data }) => {
        setMedia(data);
      })
      .catch((err) => console.warn("error", err));
  }, [state]);

  const properties = {
    duration: 4000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
    pauseOnHover: true,
  };

  const updatedMedia = (state.media ? state.media : media)
    .filter((medium) => medium.mediaUrl !== "")
    .filter((m) => m.visible === true);

  return (
    <div className="slide-container" style={{ height: "450px" }}>
      <Slide {...properties}>
        {updatedMedia.map((m, idx) => {
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
