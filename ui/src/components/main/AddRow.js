import React, { useState } from "react";

export const AddRow = ({ handleSubmit }) => {
  const initialState = {
    title: "",
    media: "",
    genre: "",
    mediaUrl: "",
    notes: "",
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
      rowData.mediaUrl !== "" &&
      rowData.notes !== ""
    );
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
                name="media"
                value={rowData.media}
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
              />
            </td>
            <td>
              <label>
                Notes
                <br />
              </label>
              <input
                type="text"
                name="notes"
                value={rowData.notes}
                onChange={handleChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
      {errors && <div style={{ color: "red" }}>Error: missing data</div>}
    </div>
  );
};
