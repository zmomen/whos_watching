import React, { useContext, useEffect, useState } from "react";
import "../Common.css";
import { Context } from "../../utils/Store";
import * as api from "../../utils/api";

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
          Currently Playing for <b>{userInfo && userInfo.name}</b>
        </li>
        <li className={"divider"}></li>
        <li>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Genre</th>
                <th>
                  <button
                    className="btn"
                    onClick={() => setIsAdding((prevState) => !prevState)}
                  >
                    <i
                      className={`icon ${
                        isAdding ? "icon-minus" : "icon-plus"
                      }`}
                    ></i>
                  </button>
                </th>
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
          {isAdding && <AddRow handleSubmit={handleSubmit} />}
        </li>
      </ul>
    </div>
  );
};

const AddRow = ({ handleSubmit }) => {
  const [rowData, setRowData] = useState({
    title: "",
    media: "",
    genre: "",
    mediaUrl: "",
  });

  const handleChange = (evt) => {
    const value = evt.target.value;
    setRowData({
      ...rowData,
      [evt.target.name]: value,
    });
  };

  return (
    <form>
      <table className="table">
        <tbody>
          <tr>
            <td>
              <label>Title</label>
              <input type="text" name="title" onChange={handleChange}></input>
            </td>
            <td>
              <label>Type</label>
              <input type="text" name="media" onChange={handleChange}></input>
            </td>
            <td>
              <label>Genre</label>
              <input type="text" name="genre" onChange={handleChange}></input>
            </td>
            <td>
              <button
                className="btn btn-success"
                onClick={(e) => handleSubmit(e, rowData)}
              >
                Add
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <label>Media Url</label>
              <input
                type="text"
                name="mediaUrl"
                onChange={handleChange}
              ></input>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};
