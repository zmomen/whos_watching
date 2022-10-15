import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addNowPlaying,
  getPreferencesToUpdateNowPlaying
} from "../../utils/api";
import { Context } from "../../utils/Store";

export const NowPlayingPage = () => {
  const [, dispatch] = useContext(Context);
  const navigate = useNavigate();
  const [currentPrefs, setCurrentPrefs] = useState([]);
  const [updatedNowPlaying, setUpdatedNowPlaying] = useState();

  useEffect(() => {
    getPreferencesToUpdateNowPlaying()
      .then(({ data }) => {
        setCurrentPrefs(data);
      })
      .catch((err) => console.warn("error", err));
  }, []);

  const handleUpdate = () => {
    addNowPlaying({ userPrefId: parseInt(updatedNowPlaying) });
    dispatch({ type: "GET_NOW_PLAYING" });
    navigate("/");
  };
  return (
    <div className="main-body">
      <ul className={"menu"}>
        <p>
          <b>
            <u>Choose from list to update Now Playing: </u>
          </b>
        </p>
        <div className="form-group">
          <select
            className="form-select"
            onChange={(e) => setUpdatedNowPlaying(e.target.value)}
            multiple
          >
            <option>Choose an option</option>
            {currentPrefs.map((pref, idx) => {
              return (
                <option key={idx} value={pref.userPrefId}>
                  {pref.name} - {pref.title}
                </option>
              );
            })}
          </select>
        </div>
        <div className="edit-buttons">
          <button
            name="Update"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            Update
          </button>
        </div>
      </ul>
    </div>
  );
};
