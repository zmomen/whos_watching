import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAllUsers, updateUserPref } from "../../utils/api";
import { Context } from "../../utils/Store";

export const UpdateRow = ({ match, location }) => {
  const history = useHistory();
  const [state, dispatch] = useContext(Context);
  const [openUserSelection, setOpenUserSelection] = useState(false);
  const [users, setUsers] = useState([]);

  let dataToUpdate = location.state;
  let paramUserId = parseInt(match.params.id) || state.userId;
  const [userPref, setUserPref] = useState(dataToUpdate ? dataToUpdate : {});
  const [changedUser, setChangedUser] = useState(paramUserId);
  const handleChange = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setUserPref((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleUpdate = (row) => {
    updateUserPref(paramUserId, row, changedUser)
      .then(({ data }) => {
        dispatch({ type: "GET_ALL_MEDIA" });
        history.push(`/users/${paramUserId}`);
      })
      .catch((err) => console.warn("error updating", err));
  };

  const handleChangeUser = () => {
    getAllUsers()
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((err) => console.warn("error", err));
    setOpenUserSelection((prevState) => !prevState);
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
                name="mediaType"
                style={{ display: "table-cell", width: "300px" }}
                defaultValue={userPref.mediaType}
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
                <b>Platform</b>
              </div>
              <input
                name="platform"
                style={{ display: "table-cell", width: "300px" }}
                defaultValue={userPref.platform}
                onChange={handleChange}
              />
            </div>
            <div style={{ display: "table-row" }}>
              <div style={{ display: "table-cell", paddingRight: "1rem" }}>
                <b>Reviews / Notes</b>
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
          <br />
          <div
            className="dropdown"
            style={{ display: "table-row" }}
            onClick={handleChangeUser}
          >
            <b className="c-hand">
              Change User&nbsp;&nbsp;
              <i
                className={`${openUserSelection ? "arrow up" : "arrow down"}`}
              ></i>
            </b>
          </div>
          {openUserSelection &&
            users.map((user, idx) => {
              return (
                <div
                  key={idx}
                  className="menu-item"
                  style={{ display: "table-cell", paddingRight: "1rem" }}
                >
                  <div
                    className={`${
                      changedUser === user.id ? "selected-user" : ""
                    } c-hand`}
                    onClick={() => setChangedUser(user.id)}
                  >
                    {user.name}
                  </div>
                </div>
              );
            })}
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
