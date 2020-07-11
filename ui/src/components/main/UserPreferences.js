import React, { useContext, useEffect, useState } from "react";
import "../Common.css";
import { Context } from "../../utils/Store";
import * as api from "../../utils/api";
import { AddRow } from "./AddRow";
import Popup from "reactjs-popup";

export const UserPreferences = () => {
  const [state] = useContext(Context);
  const [userPrefs, setUserPrefs] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [isAdding, setIsAdding] = useState(false);
  useEffect(() => {
    //get user name
    api
      .getUserByID(state.userId)
      .then(({ data }) => {
        setUserInfo(data);
      })
      .catch((err) => console.warn("error", err));

    // get user preferences.
    api
      .getUserPrefs(state.userId)
      .then(({ data }) => {
        setUserPrefs(data);
      })
      .catch((err) => console.warn("error", err));
  }, [state]);

  const handleSubmit = (e, row) => {
    e.preventDefault();
    api
      .addUserPref(state.userId, row)
      .then(({ data }) => {
        setUserPrefs(userPrefs.concat(data));
      })
      .catch((err) => console.warn("error", err));
  };

  return (
    <div className="main-body">
      <ul className={"menu"}>
        <li>
          <div
            className="d-flex"
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <div>
              Currently Playing for <b>{userInfo && userInfo.name}</b>
            </div>
            <button
              className="btn"
              onClick={() => setIsAdding((prevState) => !prevState)}
            >
              <i
                className={`icon ${isAdding ? "icon-minus" : "icon-plus"}`}
              ></i>
            </button>
          </div>
        </li>
        <li className={"divider"}></li>
        <li>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Genre</th>
                <th>Notes</th>
                <th></th>
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
                    <td>{u.notes}</td>
                    <td>
                      <UpdateModal data={u} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {isAdding && <AddRow handleSubmit={handleSubmit} />}
        </li>
      </ul>
    </div>
  );
};

const UpdateModal = ({ data }) => (
  <Popup
    trigger={<button className="btn"> Edit </button>}
    modal
    closeOnDocumentClick
  >
    <div>
      <div>
        <ul>
          <li>Title</li>
          <input value={data.title} />
          <li>Media Type</li>
          <input value={data.media} />
          <li>Genre</li>
          <input value={data.genre} />
          <li>Notes</li>
          <input value={data.notes} />
        </ul>
      </div>
      <div className="update-btn">
        <button
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            // updateRow(e, rowData);
          }}
        >
          Update
        </button>
      </div>
    </div>
  </Popup>
);
