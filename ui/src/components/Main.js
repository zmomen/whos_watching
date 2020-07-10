import React, { useContext, useEffect, useState } from "react";
import "./Common.css";
import { Context } from "../utils/Store";
import * as api from "../utils/api";

export const Main = () => {
  const [state] = useContext(Context);
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    api
      .getUserByID(state.userId)
      .then(({ data }) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        if (err.status !== undefined) {
          console.warn("API error!", err);
        } else {
          console.warn("network", err);
        }
      });
  }, [state]);
  return (
    <div className="main-body">
      <ul className={"menu"}>
        <li>Currently Playing for {currentUser && currentUser.name}</li>
        <li className={"divider"}></li>
      </ul>
    </div>
  );
};
