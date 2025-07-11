import React, { useContext, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Context } from "../../utils/Store";
import { getAllUsers, updateUserPref } from "../../utils/api";

export const UpdateRow = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(Context);
  const [openUserSelection, setOpenUserSelection] = useState(false);
  const [users, setUsers] = useState([]);

  let location = useLocation();
  let { id } = useParams();
  let paramUserId = parseInt(id) || state.userId;
  const [userPref, setUserPref] = useState(location.state ? location.state : {});
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
        navigate(`/users/${paramUserId}`);
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
          <div className="table-div">
            <div className="table-row-div">
              <div className="table-cell-div pr-1">
                <b>Title</b>
              </div>
              <input
                name="title"
                className="table-cell-div input-wide"
                defaultValue={userPref.title}
                onChange={handleChange}
              />
            </div>
            <div className="table-row-div">
              <div className="table-cell-div pr-1">
                <b>Media</b>
              </div>
              <input
                name="mediaType"
                className="table-cell-div input-wide"
                defaultValue={userPref.mediaType}
                onChange={handleChange}
              />
            </div>
            <div className="table-row-div">
              <div className="table-cell-div pr-1">
                <b>Genre</b>
              </div>
              <input
                name="genre"
                className="table-cell-div input-wide"
                defaultValue={userPref.genre}
                onChange={handleChange}
              />
            </div>
            <div className="table-row-div">
              <div className="table-cell-div pr-1">
                <b>Status</b>
              </div>
              <span className="pr-quarter">
                <input
                  type="radio"
                  name="status"
                  value="active"
                  defaultChecked={userPref.status === "active"}
                  onChange={handleChange}
                />
              </span>
              <span className="pr-quarter">Active</span>
              <span className="pr-quarter">
                <input
                  type="radio"
                  name="status"
                  value="complete"
                  onChange={handleChange}
                  defaultChecked={userPref.status === "complete"}
                />
              </span>
              <span className="pr-quarter">Complete</span>
            </div>
            <div className="table-row-div">
              <div className="table-cell-div pr-1">
                <b>URL</b>
              </div>
              <input
                name="mediaUrl"
                className="table-cell-div input-wide"
                defaultValue={userPref.mediaUrl}
                onChange={handleChange}
              />
            </div>
            <div className="table-row-div">
              <div className="table-cell-div pr-1">
                <b>Platform</b>
              </div>
              <input
                name="platform"
                className="table-cell-div input-wide"
                defaultValue={userPref.platform}
                onChange={handleChange}
              />
            </div>
            <div className="table-row-div">
              <div className="table-cell-div pr-1">
                <b>Reviews / Notes</b>
              </div>
              <input
                name="notes"
                className="table-cell-div input-wide"
                defaultValue={userPref.notes}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="table-row-div">
            <div className="table-cell-div pr-1">
              <b>Priority</b>
            </div>
            <span className="pr-quarter">
              <input
                type="radio"
                name="priority"
                value="high"
                defaultChecked={userPref.priority === "high"}
                onChange={handleChange}
              />
            </span>
            <span className="pr-quarter">High</span>
            <span className="pr-quarter">
              <input
                type="radio"
                name="priority"
                value="low"
                onChange={handleChange}
                defaultChecked={userPref.priority === "low"}
              />
            </span>
            <span className="pr-quarter">Low</span>
          </div>
          <br />
          <div
            className="dropdown table-row-div"
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
                  className="menu-item table-cell-div pr-1"
                >
                  <div
                    className={`${changedUser === user.id ? "selected-user" : ""} c-hand`}
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
