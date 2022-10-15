import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNowPlaying } from "../../utils/api";
import { Context } from "../../utils/Store";
import "../Common.css";

export const NowPlayingMenu = () => {
  const [state] = useContext(Context);
  const navigate = useNavigate();
  const [nowPlaying, setNowPlaying] = useState({});
  useEffect(() => {
    getNowPlaying()
      .then(({ data }) => {
        setNowPlaying(data);
      })
      .catch((err) => console.warn("error", err));
  }, [state]);
  return (
    <div>
      <ul className={"menu"}>
        <li>Now Playing...</li>
        <li className={"divider"} />
        <li className={"menu-item"}>
          <b>{nowPlaying.title}</b>
        </li>
        <li className={"menu-item recommended-by"}>
          <i>Recommended by: {nowPlaying.name}</i>
        </li>
        <li className="edit-buttons">
          <button
            name="Update"
            className="btn btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              navigate("/now-playing");
            }}
          >
            Update
          </button>
        </li>
      </ul>
    </div>
  );
};

export default NowPlayingMenu;
