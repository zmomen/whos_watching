import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as api from "../../utils/api";
import "../Common.css";

export const SideMenu = ({ currentUser }) => {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    api
      .getAllUsers()
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((err) => console.warn("error", err));
  }, []);

  const changeSelected = (id) => {
    history.push(`/users/${id}`);
  };
  return (
    <div>
      <ul className={"menu"}>
        <li>Who's Watching</li>
        <li className={"divider"} />
        {users.map((user, idx) => {
          return (
            <li key={idx} className={"menu-item"}>
              <div
                className={`${
                  parseInt(currentUser) === user.id ? "selected-user" : ""
                } c-hand`}
                onClick={() => changeSelected(user.id)}
              >
                <figure className="avatar avatar-sm bg-white">
                  <img src={user.profileUrl} alt="couple_img" />
                </figure>
                &nbsp;{user.name}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
