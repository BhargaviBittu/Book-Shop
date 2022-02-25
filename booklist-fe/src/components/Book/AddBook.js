import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthenticationService from "../service/AuthenticationService";
import CurrencyInput from "react-currency-input-field";
import "bootstrap/dist/css/bootstrap.css";
import { Button } from "react-bootstrap";
import "./BookList.css";

const AddBook = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("");
  const [price, setPrice] = useState("");
  const [language, setLanguage] = useState("");
  const [books, setBooks] = useState([]);
  const [errorList, setErrorList] = useState([]);
  const prefix = "€ ";
  const [value, setValue] = useState(0);
  const role = AuthenticationService.getUserRole();
  const [isEdit, setIsEdit] = useState(useLocation().state);
  const [editData, setEditData] = useState(
    useLocation().state || {
      id: "",
      title: "",
      author: "",
      isbnNumber: "",
      price: "",
      language: "",
    }
  );

  const handlePriceChange = (e) => {
    e.preventDefault();
    const { name, value = "" } = e.target;
    const parsedValue = value.replace(/[^\d.]/gi, "");
    setEditData((prevState) => ({
      ...prevState,
      [name]: parsedValue,
    }));
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setEditData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLangInputChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setEditData((prevState) => ({
      ...prevState,
      language: value,
    }));
  };

  // useEffect(() => {
  //   AuthenticationService.isAuthenticated(navigate);
  // }, []);

  async function handleClick(e) {
    e.preventDefault();
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    const authenticateUrl = "book/add";

    try {
      await AuthenticationService.httpPostRequest(
        username,
        password,
        authenticateUrl,
        editData
      ).then((response) => {
    
        if (response.status !== 200) {
          response.json().then((errorList) => setErrorList(errorList));
        } else {
          console.log("New Book added");
          navigate("/BookList");
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  const getErrorMessage = (field) =>
    errorList.filter((error) => error.field === field)[0]?.defaultMessage;

  return (
    <div className="card book-card mx-auto mt-5 ">
      <div className="card-header bg-transparent border-0 text-center">
        {isEdit === null ? <h3>Add Book</h3> : <h3>Edit Book</h3>}
      </div>
      <div className="card-body">
        <form name="form" autoComplete="off">
          <div className="form-group">
            <label className="mb-0">
              Book Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              defaultValue={editData?.title}
              required
              onChange={handleInputChange}
              disabled ={role !== "ADMIN"}
            />
            <div className="book-error "> {getErrorMessage("title")}</div>
          </div>

          <div className="form-group">
            <label className="mb-0">
              Author <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="author"
              defaultValue={editData?.author}
              required
              onChange={handleInputChange}
              disabled ={role !== "ADMIN"}
            />
            <div className="book-error "> {getErrorMessage("author")}</div>
          </div>

          <div className="form-group">
            <label className="mb-0">
              IsbnNumber <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="isbnNumber"
              defaultValue={editData?.isbnNumber}
              required
              onChange={handleInputChange}
              disabled ={role !== "ADMIN"}
            />
          </div>

          <div className="form-group">
            <label className="mb-0">
              Price <span className="text-danger">*</span>
            </label>

            <CurrencyInput
              prefix={prefix}
              className="form-control"
              name="price"
              id="currencyInput"
              data-number-to-fixed="2"
              data-number-stepfactor="100"
              defaultValue={editData?.price}
              placeholder=""
              onChange={handlePriceChange}
              required
              allowDecimals
              decimalsLimit="2"
              disabled ={role !== "ADMIN"}
            />
            <div className="book-error "> {getErrorMessage("price")}</div>
          </div>
          <div className="form-group">
            <label>
              Sprache <span className="text-danger">*</span>
            </label>
            <select
              className="form-control"
              defaultValue={editData?.language}
              required
              onChange={handleLangInputChange}
              disabled ={role !== "ADMIN"}
            >
              <option value=""></option>
              <option value="Englisch">Englisch</option>
              <option value="Deutsch">Deutsch</option>
              <option value="Französisch">Französisch</option>
              <option value="Spanisch">Spanisch</option>
            </select>
          </div>

          {role === "ADMIN" ? isEdit === null ? (
            <Button
              onClick={handleClick}
              className="btn btn-primary btn-lg w-100" disabled ={role !== "ADMIN"}
              type="submit"
            >
              Add Book
            </Button>
          ) : (
            <Button
              onClick={handleClick}
              className="btn btn-primary btn-lg w-100" disabled ={role !== "ADMIN"}
              type="submit"
            >
              Save Book
            </Button>
          ): ""}
        </form>
      </div>
    </div>
  );
}

export default AddBook;