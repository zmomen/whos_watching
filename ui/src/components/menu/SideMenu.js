import React from "react";
import "../Common.css";
import soccerImg from "./img_soccer.png";
import flowerImg from "./img_flower.png";
import coupleImg from "./img_couple.png";

export const SideMenu = () => {
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
