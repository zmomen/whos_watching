import React, { useContext, useEffect, useState } from "react";
import "../Common.css";
import { Context } from "../../utils/Store";
import * as api from "../../utils/api";

export const Main = () => {
  const [state] = useContext(Context);
  const [userPrefs, setUserPrefs] = useState([]);
  useEffect(() => {
    // get user preferences.
    api
      .getUserPrefs(state.userId)
      .then(({ data }) => {
        setUserPrefs(data);
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
        <li>
          Currently Playing for <b>{state.userId}</b>
        </li>
        <li className={"divider"}></li>
        <li>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Genre</th>
              </tr>
            </thead>
            <tbody>
              {userPrefs.map((u, idx) => {
                return (
                  <tr
                    key={idx}
                    className={`${(idx + 1) % 2 === 0 ? "active" : ""}`}
                  >
                    <td>{u.title}</td>
                    <td>{u.media}</td>
                    <td>{u.genre}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </li>
      </ul>
    </div>
  );
};
