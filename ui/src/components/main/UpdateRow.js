import React, { useState } from "react";
import Popup from "reactjs-popup";

export const UpdateRow = ({ data, handleUpdate }) => {
  const [userPref, setUserPref] = useState(data ? data : {});
  const [status, setStatus] = useState();
  const handleChange = (evt) => {
    setStatus(null);
    const name = evt.target.name;
    const newValue = evt.target.value;
    setUserPref((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  return (
    <Popup
      trigger={
        <button className="btn">
          <i className="icon icon-edit"></i>
        </button>
      }
      modal
    >
      <div>
        <p>
          <b>
            <u>Edit: </u>
          </b>
        </p>
        <div>
          <div style={{ paddingBottom: "2rem" }}>
            <div style={{ float: "left" }}>
              <b>Title</b>
            </div>
            <div style={{ float: "right" }}>{userPref.title}</div>
          </div>
          <div style={{ paddingBottom: "2rem" }}>
            <div style={{ float: "left" }}>
              <b>Media</b>
            </div>
            <div style={{ float: "right" }}>{userPref.media}</div>
          </div>
          <div style={{ paddingBottom: "2rem" }}>
            <div style={{ float: "left" }}>
              <b>Genre</b>
            </div>
            <div style={{ float: "right" }}>{userPref.genre}</div>
          </div>
          <div style={{ paddingBottom: "2rem" }}>
            <div style={{ float: "left" }}>
              <b>URL</b>
            </div>
            <input
              name="mediaUrl"
              style={{ float: "right" }}
              defaultValue={userPref.mediaUrl}
              onChange={handleChange}
            />
          </div>
          <div style={{ paddingBottom: "2rem" }}>
            <div style={{ float: "left" }}>
              <b>Notes</b>
            </div>
            <input
              name="notes"
              style={{ float: "right" }}
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
              setStatus(e.target.name);
            }}
          >
            Update
          </button>
        </div>
        {status && <div className={"text-center text-success"}>{status}d!</div>}
      </div>
    </Popup>
  );
};
