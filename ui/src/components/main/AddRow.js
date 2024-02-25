import React, { useState } from "react";

export const AddRow = ({ handleAdd }) => {
  const initialState = {
    title: "",
    mediaType: "",
    genre: "",
    mediaUrl: "",
    platform: "",
    notes: "",
    updatedAt: new Date(),
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

  const isDataValid = (data) => {
    return data.title !== "" && data.media !== "" && data.genre !== "";
  };

  return (
    <div className="add-row">
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
              />
            </td>
            <td>
              <label>
                Type
                <br />
              </label>
              <input
                type="text"
                name="mediaType"
                value={rowData.mediaType}
                onChange={handleChange}
              />
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
              />
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
              />
            </td>
            <td>
              <label>
                Platform
                <br />
              </label>
              <input
                type="text"
                name="platform"
                value={rowData.platform}
                onChange={handleChange}
              />
            </td>
            <td>
              <label>
                Reviews / Notes
                <br />
              </label>
              <input
                type="text"
                name="notes"
                value={rowData.notes}
                onChange={handleChange}
              />
            </td>
            <td>
              <br />
              <button
                className="btn btn-success"
                onClick={(e) => {
                  e.preventDefault();
                  if (isDataValid(rowData)) {
                    handleAdd(rowData);
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
        </tbody>
      </table>
      {errors && (
        <div style={{ color: "red" }}>
          Error: title, media, or genre cannot be empty
        </div>
      )}
    </div>
  );
};
