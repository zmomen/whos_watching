import React, { useState, useContext } from "react";
import { updateUserPref } from "../../utils/api";
import { SideMenu } from "../menu/SideMenu";
import { useHistory } from "react-router-dom";
import { Context } from "../../utils/Store";

export const UpdateRow = ({ match, location }) => {
  const history = useHistory();
  let dataToUpdate = location.state;
  const [state, dispatch] = useContext(Context);
  let paramUserId = match.params.id || 3;
  const [userPref, setUserPref] = useState(dataToUpdate ? dataToUpdate : {});
  const handleChange = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setUserPref((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleUpdate = (row) => {
    updateUserPref(paramUserId, row)
      .then(({ data }) => {
        console.warn("data updated", data);
        dispatch({ type: "GET_ALL_MEDIA" });
        history.push(`/users/${paramUserId}`);
        // update state.
        // const newArr = userPrefs.slice();
        // const existingObj = newArr.find((item) => item.id === data.id);
        // if (existingObj) {
        //   Object.assign(existingObj, data);
        // } else {
        //   newArr.push(data);
        // }
        // setUserPrefs(newArr);
      })
      .catch((err) => console.warn("error updating", err));
  };

  return (
    <div className="d-flex">
      <SideMenu currentUser={paramUserId} />
      <div className="main-body">
        <ul className={"menu"}>
          <li>
            <p>
              <b>
                <u>Edit: </u>
              </b>
            </p>
            <div style={{ display: "table" }}>
              <div style={{ display: "table-row" }}>
                <div style={{ display: "table-cell", paddingRight: "1rem" }}>
                  <b>Title</b>
                </div>
                <div style={{ display: "table-cell" }}>{userPref.title}</div>
              </div>
              <div style={{ display: "table-row" }}>
                <div style={{ display: "table-cell", paddingRight: "1rem" }}>
                  <b>Media</b>
                </div>
                <div style={{ display: "table-cell" }}>{userPref.media}</div>
              </div>
              <div style={{ display: "table-row" }}>
                <div style={{ display: "table-cell", paddingRight: "1rem" }}>
                  <b>Genre</b>
                </div>
                <div style={{ display: "table-cell" }}>{userPref.genre}</div>
              </div>
              <div style={{ display: "table-row" }}>
                <div style={{ display: "table-cell", paddingRight: "1rem" }}>
                  <b>URL</b>
                </div>
                <input
                  name="mediaUrl"
                  style={{ display: "table-cell", width: "300px" }}
                  defaultValue={userPref.mediaUrl}
                  onChange={handleChange}
                />
              </div>
              <div style={{ display: "table-row" }}>
                <div style={{ display: "table-cell", paddingRight: "1rem" }}>
                  <b>Notes</b>
                </div>
                <input
                  name="notes"
                  style={{ display: "table-cell", width: "300px" }}
                  defaultValue={userPref.notes}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="edit-buttons">
              <button
                name="Update"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  handleUpdate(userPref);
                }}
              >
                Update
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
