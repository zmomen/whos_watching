import React from "react";
import "../Common.css";

function Banner(props) {
  return (
    <div style={{ height: "75px" }}>
      <ul className={"menu"}>
        <li
          style={{
            display: "flex",
            justifyContent: "center",
            fontFamily: "fantasy",
            fontSize: "x-large",
          }}
        >
          WHO'S WATCHING
        </li>
      </ul>
    </div>
  );
}

export default Banner;
