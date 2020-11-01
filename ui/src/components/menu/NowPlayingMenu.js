import React, { useContext, useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { getNowPlaying } from "../../utils/api";
import { Context } from "../../utils/Store";
import "../Common.css";

export const NowPlayingMenu = () => {
  const [state] = useContext(Context);
  const history = useHistory();
  console.warn("what my stat", state);
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
              history.push("/now-playing");
            }}
          >
            Update
          </button>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(NowPlayingMenu);
