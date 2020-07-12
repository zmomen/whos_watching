import React, { useContext, useEffect, useState } from "react";
import * as api from "../../utils/api";
import { Context } from "../../utils/Store";
import "../Common.css";
import { AddRow } from "./AddRow";
import { UpdateRow } from "./UpdateRow";

export const UserPreferences = () => {
  const [state, dispatch] = useContext(Context);
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

  const handleAdd = (row) => {
    api
      .addUserPref(state.userId, row)
      .then(({ data }) => {
        setUserPrefs(userPrefs.concat(data));
        dispatch({ type: "GET_ALL_MEDIA" });
      })
      .catch((err) => console.warn("error adding", err));
  };

  const handleUpdate = (row) => {
    api
      .updateUserPref(state.userId, row)
      .then(({ data }) => {
        // update state.
        const newArr = userPrefs.slice();
        const existingObj = newArr.find((item) => item.id === data.id);
        if (existingObj) {
          Object.assign(existingObj, data);
        } else {
          newArr.push(data);
        }
        setUserPrefs(newArr);
        dispatch({ type: "GET_ALL_MEDIA" });
      })
      .catch((err) => console.warn("error updating", err));
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
          {isAdding && <AddRow handleAdd={handleAdd} />}
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
                      <UpdateRow data={u} handleUpdate={handleUpdate} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </li>
      </ul>
    </div>
  );
};
