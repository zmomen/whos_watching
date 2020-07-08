import React from "react";

export default function ErrorBlock({ style, errors, message }) {
  let colorStyle;
  switch (true) {
    case message.includes("Error"):
      colorStyle = "text-error";
      break;
    case message.includes("Add") || message.includes("Edit"):
      colorStyle = "text-success";
      break;
    default:
      colorStyle = "black";
  }

  return <div className={colorStyle}>{message}</div>;
}
