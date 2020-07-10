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
  const initialState = {
    title: "",
    media: "",
    genre: "",
    mediaUrl: "",
  };
  const [rowData, setRowData] = useState(initialState);
  const [errors, setErrors] = useState(false);

  const handleChange = (evt) => {
    setErrors(false);
    const value = evt.target.value;
    setRowData({
      ...rowData,
      [evt.target.name]: value,
    });
  };

  const isDataValid = () => {
    return (
      rowData.title !== "" &&
      rowData.genre !== "" &&
      rowData.media !== "" &&
      rowData.mediaUrl !== ""
    );
  };

  return (
    <div className="add-row">
      <form>
        <table className="table">
          <tbody>
            <tr>
              <td>
                <label>
                  Title
                  <br />
                </label>
                <input
                  type="text"
                  name="title"
                  value={rowData.title}
                  onChange={handleChange}
                ></input>
              </td>
              <td>
                <label>
                  Type
                  <br />
                </label>
                <input
                  type="text"
                  name="media"
                  value={rowData.media}
                  onChange={handleChange}
                ></input>
              </td>
              <td>
                <label>
                  Genre
                  <br />
                </label>
                <input
                  type="text"
                  name="genre"
                  value={rowData.genre}
                  onChange={handleChange}
                ></input>
              </td>
              <td>
                <br />
                <button
                  className="btn btn-success"
                  onClick={(e) => {
                    e.preventDefault();
                    if (isDataValid()) {
                      handleSubmit(e, rowData);
                      setRowData(initialState);
                    } else {
                      setErrors(true);
                    }
                  }}
                >
                  Add
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <label>
                  Media Url
                  <br />
                </label>
                <input
                  type="text"
                  name="mediaUrl"
                  value={rowData.mediaUrl}
                  onChange={handleChange}
                ></input>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      {errors && <div style={{ color: "red" }}>Error: missing data</div>}
    </div>
  );
};
