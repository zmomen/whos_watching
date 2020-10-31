import React from "react";
import "../Common.css";

export const NowPlaying = ({ nowPlaying }) => {
  // const history = useHistory();
  // const changeSelected = (id) => {
  //   setSelected(id);
  //   history.push(`/users/${id}`);
  // };
  return (
    <div>
      <ul className={"menu"}>
        <li>Now Playing...</li>
        <li className={"divider"} />
        <li className={"menu-item"}>
          <b>{nowPlaying.title}</b>
        </li>
        <li className={"menu-item"}>
          <i>Recommended by: {nowPlaying.name}</i>
        </li>
        <li className="edit-buttons">
          <button
            name="Update"
            className="btn btn-secondary"
            // onClick={(e) => {
            // e.preventDefault();
            // handleUpdate(userPref);
            // }}
          >
            Update
          </button>
        </li>
      </ul>
    </div>
  );
};
