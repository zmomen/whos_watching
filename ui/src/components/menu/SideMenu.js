import React, { useEffect } from "react";
import "../Common.css";
import soccerImg from "./img_soccer.png";
import flowerImg from "./img_flower.png";
import coupleImg from "./img_couple.png";
import * as api from "../../utils/api";

export const SideMenu = () => {
  useEffect(() => {
    api
      .getAllUsers()
      .then((response) => console.warn("res", response))
      .then((contents) => console.log(contents))
      // .then(({ data }) => {
        // console.warn("data here", data);
      // })
      .catch((err) => {
        if (err.status !== undefined) {
          console.warn("500 errro", err);
        } else {
          console.warn("network", err);
        }
      });
  });
  return (
    <div className={"side-menu"}>
      <ul className={"menu"}>
        <li>What's Playing</li>
        <li className={"divider"}></li>
        <li className={"menu-item"}>
          <a href="/#">
            <figure className="avatar avatar-sm bg-white">
              <img src={coupleImg} alt="couple_img" />
            </figure>
            &nbsp;&nbsp;For Both
          </a>
        </li>
        <li className={"menu-item"}>
          <a href="/#">
            <figure className="avatar avatar-sm bg-white">
              <img src={soccerImg} alt="soccer_img" />
            </figure>
            &nbsp;&nbsp;Zaid
          </a>
        </li>
        <li className={"menu-item"}>
          <a href="/#">
            <figure className="avatar avatar-sm bg-white">
              <img src={flowerImg} alt="flower_img" />
            </figure>
            &nbsp;&nbsp;Kristen
          </a>
        </li>
      </ul>
    </div>
  );
};
