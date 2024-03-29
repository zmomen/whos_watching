import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Common.css";

export const SideMenu = ({ users, currentUser }) => {
  const [selected, setSelected] = useState(currentUser);
  const navigate = useNavigate();
  const changeSelected = (id) => {
    setSelected(id);
    navigate(`/users/${id}`);
  };
  return (
    <div>
      <ul className={"menu"}>
        <li>Who's Watching</li>
        <li className={"divider"} />
        {users &&
          users.map((user, idx) => {
            return (
              <li key={idx} className={"menu-item"}>
                <div
                  className={`${
                    selected === user.id ? "selected-user" : ""
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
