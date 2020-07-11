import React, { useState } from "react";
import Popup from "reactjs-popup";

export const UpdateRow = ({ data, handleUpdate }) => {
  //   const handleChange = (evt) => {
  //     const name = evt.target.name;
  //     const newValue = evt.target.value;
  //     setUserInput({ [name]: newValue });
  //   };

  const [students, setStudents] = useState({ students: [] });

  return (
    <Popup
      trigger={
        <button className="btn">
          <i className="icon icon-edit"></i>
        </button>
      }
      modal
      closeOnDocumentClick
    >
        
    </Popup>
  );
};

/*
<div>
        <p>
          <b>Edit Prefrerence: </b>
        </p>
        <div>
          <div style={{ paddingBottom: "2rem" }}>
            <div style={{ float: "left" }}>
              {capitalizeFirstLetter(userInput.title)}
            </div>
            <input
              style={{ float: "right" }}
              value={userInput.title}
              onChange={handleChange}
            />
          </div>
          <div style={{ paddingBottom: "2rem" }}>
            <div style={{ float: "left" }}>
              {capitalizeFirstLetter(userInput.genre)}
            </div>
            <input
              style={{ float: "right" }}
              value={userInput.genre}
              onChange={handleChange}
            />
          </div>
          <div style={{ paddingBottom: "2rem" }}>
            <div style={{ float: "left" }}>
              {capitalizeFirstLetter(userInput.status)}
            </div>
            <input
              style={{ float: "right" }}
              value={userInput.status}
              onChange={handleChange}
            />
          </div>
          <div style={{ paddingBottom: "2rem" }}>
            <div style={{ float: "left" }}>
              {capitalizeFirstLetter(userInput.notes)}
            </div>
            <input
              style={{ float: "right" }}
              value={userInput.notes}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="edit-buttons">
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              handleUpdate(e, data);
            }}
          >
            Update
          </button>
          <button
            className="btn btn-error"
            onClick={(e) => {
              e.preventDefault();
              // updateRow(e, rowData);
            }}
          >
            Delete
          </button>
        </div>
      </div> 
*/
