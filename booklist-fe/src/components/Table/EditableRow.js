import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a title..."
          name="title"
          value={editFormData.title}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter an author..."
          name="author"
          value={editFormData.author}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="isbnNumber"
          placeholder="Enter a isbnNumber..."
          name="isbnNumber"
          value={editFormData.isbnNumber}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="price"
          required="required"
          placeholder="Enter an price..."
          name="price"
          value={editFormData.price}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="language"
          required="required"
          placeholder="Enter an language..."
          name="language"
          value={editFormData.language}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button
          type="submit"
          className="btn btn-success btn-xs"
        >
          Speichern
        </button>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger btn-xs"
          onClick={handleCancelClick}
        >
          Abbrechen
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
