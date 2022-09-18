import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getLatestReviews } from "../../utils/api";
import "../Common.css";

function LatestReviews(props) {
  const [latestReviews, setLatestReviews] = useState([])
  useEffect(() => {
    getLatestReviews()
      .then(({ data }) => {
        setLatestReviews(data);
      })
      .catch((err) => console.warn("error", err));
  }, [])

  var sliderSettings = {
    arrows: false,
    autoplay: true,
    fade: true,
    infinite: true,
    speed: 750,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div style={{ paddingBottom: "16px" }}>
      <ul className={"menu"}>
        <h3 className="banner">The Reviews are in!</h3>
        <Slider style={{ width: "700px" }} {...sliderSettings}>
          {latestReviews.map((review, idx) => {
            return <li key={idx}>
              <h5>{review.title}</h5>
              <p>{review.notes}</p>
            </li>
          })}
        </Slider>
      </ul>
    </div>
  );
}

export default LatestReviews;
