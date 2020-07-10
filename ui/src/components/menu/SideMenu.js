import React, { useEffect, useState, useContext } from "react";
import "../Common.css";
import * as api from "../../utils/api";
import { Context } from "../../utils/Store";

export const SideMenu = () => {
  const [state, dispatch] = useContext(Context);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    api
      .getAllUsers()
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((err) => {
        if (err.status !== undefined) {
          console.warn("API error!", err);
        } else {
          console.warn("network", err);
        }
      });
  }, []);

  console.warn("stat", state);
  const changeSelected = (id) => {
    dispatch({ type: "SET_GLOBAL_USER", payload: id });
  };
  return (
    <div className={"side-menu"}>
      <ul className={"menu"}>
        <li>What's Playing</li>
        <li className={"divider"} />
        {users.map((user, idx) => {
          return (
            <li key={idx} className={"menu-item"}>
              <div
                className={`${
                  state.userId === user.id ? "selected-user" : ""
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
