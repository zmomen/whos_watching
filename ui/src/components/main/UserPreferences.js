import React, { useContext, useEffect, useState } from "react";
import * as api from "../../utils/api";
import { Context } from "../../utils/Store";
import "../Common.css";
import { AddRow } from "./AddRow";
import { Link } from "react-router-dom";
import { SideMenu } from "../menu/SideMenu";

export const UserPreferences = ({ match }) => {
  let paramUserId = match.params.id || 3;
  const [state, dispatch] = useContext(Context);
  const [userPrefs, setUserPrefs] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [isAdding, setIsAdding] = useState(false);
  useEffect(() => {
    //get user name
    api
      .getUserByID(paramUserId)
      .then(({ data }) => {
        setUserInfo(data);
      })
      .catch((err) => console.warn("error", err));

    // get user preferences.
    api
      .getUserPrefs(paramUserId)
      .then(({ data }) => {
        setUserPrefs(data);
      })
      .catch((err) => console.warn("error", err));
  }, [paramUserId]);

  const handleAdd = (row) => {
    api
      .addUserPref(state.userId, row)
      .then(({ data }) => {
        setUserPrefs(userPrefs.concat(data));
        dispatch({ type: "GET_ALL_MEDIA" });
      })
      .catch((err) => console.warn("error adding", err));
  };

  return (
    <div className="d-flex">
      <SideMenu currentUser={paramUserId} />
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
              {isAdding ? (
                <img
                  className="c-hand"
                  onClick={() => setIsAdding((prevState) => !prevState)}
                  width="40"
                  height="40"
                  src="/images/icons/icon-minus.png"
                  alt={"close"}
                />
              ) : (
                <img
                  className="c-hand"
                  onClick={() => setIsAdding((prevState) => !prevState)}
                  width="40"
                  height="40"
                  src="/images/icons/icon-plus.png"
                  alt={"add"}
                />
              )}
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
                {userPrefs.map((up, idx) => {
                  return (
                    <tr
                      key={idx}
                      className={`${(idx + 1) % 2 === 0 ? "active" : ""}`}
                    >
                      <td>{up.title}</td>
                      <td>{up.media}</td>
                      <td>{up.genre}</td>
                      <td>{up.notes}</td>
                      <td>
                        <Link
                          to={{
                            pathname: `/users/${paramUserId}/preferences/${up.id}`,
                            state: up,
                          }}
                        >
                          <img
                            className="c-hand"
                            width="40"
                            height="40"
                            src="/images/icons/icon-edit.png"
                            alt={"edit"}
                          />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </li>
        </ul>
      </div>
    </div>
  );
};
