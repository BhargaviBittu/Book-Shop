import React, { useEffect } from "react";
import * as CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPencilAlt, FaTrashAlt, FaBook } from "react-icons/fa";
import { Button } from "react-bootstrap";
import AuthenticationService from "../service/AuthenticationService";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

var base64 = require("base-64");

const ReadOnlyRow = ({ book, handleEditClick, handleDeleteClick }) => {
  const role = AuthenticationService.getUserRole();
  let navigate = useNavigate();

  const handleEditChange = (event, book) => {
    event.preventDefault();
    navigate("/AddBook", { state: book });
  };

  const renderEditTooltip = (props) => (
    <Tooltip id="button-edit-tooltip" {...props}>
      Bearbieten
    </Tooltip>
  );

  const renderDeleteTooltip = (props) => (
    <Tooltip id="button-delete-tooltip" {...props}>
      Löschen
    </Tooltip>
  );

  const renderDisplayTooltip = (props) => (
    <Tooltip id="button-delete-tooltip" {...props}>
      Anzeige
    </Tooltip>
  );

  var CurrencyFormat = require("react-currency-format");
  return (
    <tr>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.isbnNumber}</td>
      <td>
        <CurrencyFormat
          value={book.price}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"€"}
          renderText={(value) => <div>{value}</div>}
        />
      </td>
      <td>{book.language}</td>
      <td>
        {role === "ADMIN" ? (
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderEditTooltip}
          >
            <Button
              className="btn btn-success btn-xs"
              onClick={(event) => handleEditClick(event, book)}
            >
              <FaPencilAlt />
            </Button>
          </OverlayTrigger>
        ) : (
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderDisplayTooltip}
          >
            <Button
              className="btn btn-success btn-xs"
              onClick={(event) => handleEditClick(event, book)}
            >
              <FaBook />
            </Button>
          </OverlayTrigger>
        )}
      </td>
      <td>
        {role === "ADMIN" ? (
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderDeleteTooltip}
          >
            <Button
              className="btn btn-danger btn-xs"
              onClick={() => handleDeleteClick(book.id)}
            >
              <FaTrashAlt />
            </Button>
          </OverlayTrigger>
        ) : (
          <td></td>
        )}
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
