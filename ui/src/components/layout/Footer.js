import React from "react";

function HorizontalDiv(props) {
  var style = {
    borderRadius: "10px",
    backgroundColor: `${props.color}`,
    borderTop: "1px solid #E7E7E7",
    textAlign: "right",
    padding: "20px",
    marginTop: "20px",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
  };
  return (
    <div className="container grid-lg" style={style}>
      {props.children}
    </div>
  );
}

function Footer() {
  return (
    <>
      <HorizontalDiv color="#4c4c4e">
        <span role="img" aria-label="muscle" style={{ color: "white" }}>
          Created By zmomen © 2020 💪🏼
        </span>
      </HorizontalDiv>
    </>
  );
}

export default Footer;
