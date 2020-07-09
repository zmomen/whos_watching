import React, { useEffect, useState } from "react";
import "../Common.css";
import * as api from "../../utils/api";

export const SideMenu = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    api
      .getAllUsers()
      .then(({ data }) => {
        setUsers(data);
        console.warn("res", data);
      })
      .catch((err) => {
        if (err.status !== undefined) {
          console.warn("API error!", err);
        } else {
          console.warn("network", err);
        }
      });
  }, []);
  return (
    <div className={"side-menu"}>
      <ul className={"menu"}>
        <li>What's Playing</li>
        <li className={"divider"} />
        {users.map((user) => {
          return (
            <li className={"menu-item"}>
              <a href="/#">
                <figure className="avatar avatar-sm bg-white">
                  <img src={user.profileUrl} alt="couple_img" />
                </figure>
                &nbsp;{user.name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
