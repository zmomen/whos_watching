import React from "react";

function HorizontalDiv(props) {
  return (
    <div
      className="footer-bar"
      style={{ "--footer-bg": props.color }}
    >
      {props.children}
    </div>
  );
}

function Footer() {
  return (
    <>
      <HorizontalDiv color="#4c4c4e">
        <span role="img" aria-label="muscle" className="footer-text">
          Created By zmomen © 2020 💪🏼
        </span>
      </HorizontalDiv>
    </>
  );
}

export default Footer;
