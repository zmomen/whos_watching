import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { updateUserPref } from "../../utils/api";
import { Context } from "../../utils/Store";

export const UpdateRow = ({ match, location }) => {
  const history = useHistory();
  const [state, dispatch] = useContext(Context);
  let dataToUpdate = location.state;
  let paramUserId = match.params.id || state.userId;
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
        dispatch({ type: "GET_ALL_MEDIA" });
        history.push(`/users/${paramUserId}`);
      })
      .catch((err) => console.warn("error updating", err));
  };

  return (
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
              <input
                name="title"
                style={{ display: "table-cell", width: "300px" }}
                defaultValue={userPref.title}
                onChange={handleChange}
              />
            </div>
            <div style={{ display: "table-row" }}>
              <div style={{ display: "table-cell", paddingRight: "1rem" }}>
                <b>Media</b>
              </div>
              <input
                name="media"
                style={{ display: "table-cell", width: "300px" }}
                defaultValue={userPref.media}
                onChange={handleChange}
              />
            </div>
            <div style={{ display: "table-row" }}>
              <div style={{ display: "table-cell", paddingRight: "1rem" }}>
                <b>Genre</b>
              </div>
              <input
                name="genre"
                style={{ display: "table-cell", width: "300px" }}
                defaultValue={userPref.genre}
                onChange={handleChange}
              />
            </div>
            <div style={{ display: "table-row" }}>
              <div style={{ display: "table-cell", paddingRight: "1rem" }}>
                <b>Status</b>
              </div>
              <span style={{ paddingRight: ".25rem" }}>
                <input
                  type="radio"
                  name="status"
                  value="active"
                  defaultChecked={userPref.status === "active"}
                  onChange={handleChange}
                />
              </span>
              <span style={{ paddingRight: ".25rem" }}>Active</span>
              <span style={{ paddingRight: ".25rem" }}>
                <input
                  type="radio"
                  name="status"
                  value="complete"
                  onChange={handleChange}
                  defaultChecked={userPref.status === "complete"}
                />
              </span>
              <span style={{ paddingRight: ".25rem" }}>Complete</span>
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
          <div style={{ display: "table-row" }}>
            <div style={{ display: "table-cell", paddingRight: "1rem" }}>
              <b>Priority</b>
            </div>
            <span style={{ paddingRight: ".25rem" }}>
              <input
                type="radio"
                name="priority"
                value="high"
                defaultChecked={userPref.priority === "high"}
                onChange={handleChange}
              />
            </span>
            <span style={{ paddingRight: ".25rem" }}>High</span>
            <span style={{ paddingRight: ".25rem" }}>
              <input
                type="radio"
                name="priority"
                value="low"
                onChange={handleChange}
                defaultChecked={userPref.priority === "low"}
              />
            </span>
            <span style={{ paddingRight: ".25rem" }}>Low</span>
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
  );
};
