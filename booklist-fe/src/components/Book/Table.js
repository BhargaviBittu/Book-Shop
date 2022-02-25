import React, { useState, Fragment, useEffect } from "react";
import ReadOnlyRow from "../Table/ReadOnlyRow";
import EditableRow from "../Table/EditableRow";
import AuthenticationService from "../service/AuthenticationService";
import { useNavigate } from "react-router-dom";

var base64 = require("base-64");

const Table = () => {
  const authenticateUrl = "book/getAll";
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [editBookId, setEditBookId] = useState(null);
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  const [editFormData, setEditFormData] = useState({
    title: "",
    author: "",
    isbnNumber: "",
    price: "",
    language: "",
  });

  useEffect(() => {
    async function table() {
      try {
        await AuthenticationService.httpGetRequest(
          username,
          password,
          authenticateUrl
        )
          .then((res) => res.json())
          .then((result) => {
            setBooks(result);
          });
      } catch (e) {
        console.log(e);
      }
    }
    table();
  }, []);

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  async function handleEditFormSubmit(event) {
    event.preventDefault();

    const editedBook = {
      id: editBookId,
      title: editFormData.title,
      author: editFormData.author,
      isbnNumber: editFormData.isbnNumber,
      price: editFormData.price,
      language: editFormData.language,
    };
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    const authenticateUrl = "book/update";

    try {
      await AuthenticationService.httpPostRequest(
        username,
        password,
        authenticateUrl,
        editedBook
      ).then(() => {
        console.log("New Book updated");
        handleCancelClick();
      });
    } catch (e) {
      console.log(e);
    }
  }

  const handleCancelClick = () => {
    setEditBookId(null);
  };

  const handleEditClick = (event, book) => {
    event.preventDefault();
    // setEditBookId(book.id);

    // const formValues = {
    //   title: book.title,
    //   author: book.author,
    //   isbnNumber: book.isbnNumber,
    //   price: book.price,
    //   language: book.language,
    // };

    // setEditFormData(formValues);
    navigate("/AddBook", { state: book });
  };

  const handleDeleteClick = (bookId) => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    var credentials = base64.encode(username + ":" + password);
    var basicAuth = "Basic " + credentials;
    let headers = new Headers();
    headers.append("Authorization", basicAuth);
    headers.append("Content-Type", "application/json");

    fetch("http://localhost:8080/book/delete/" + bookId, {
      method: "DELETE",
      mode: "cors",
      crossDomain: true,
      headers: headers,
    }).then(() => {
      const newbookList = books.filter((book) => book.id !== bookId);
      console.log("Book deleted", newbookList);
      setBooks(newbookList);
    });
  };

  return (
    <div className="card">
      <form onSubmit={handleEditFormSubmit}>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN Number</th>
              <th>Price</th>
              <th>Language</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <Fragment>
                {editBookId === book.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    book={book}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default Table;
