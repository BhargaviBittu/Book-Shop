import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../service/AuthenticationService";
import NumberFormat from "react-number-format";
import "./LoginForm.css";
var base64 = require("base-64");

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authenticateUrl = "authenticate/login/";
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();

    try {
      await AuthenticationService.httpGetRequest(
        username,
        password,
        authenticateUrl
      ).then((response) => {
        if (response.status === 200) {
          response.json().then((authority) => {
            localStorage.setItem("role", authority.authority);
            localStorage.setItem("loggedIn", true);
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            navigate("/BookList");
          });
        }
      });
    } catch (e) {
      console.log(e);
      setErrorMessage("Bitte Benutzernamen und Passwort überprüfen");
    }
  }

  useEffect(() => {
    setTimeout(() => {
      AuthenticationService.isAuthenticated(navigate);
    }, 5000);
  }, []);

  return (
    <div className="card login-card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">
      <div className="card-header bg-transparent border-0 text-center">
        <h3>Book Login</h3>
      </div>
      <div className="card-body">
        <form name="form" onSubmit={onSubmit} autoComplete="off">
          <div className="form-group">
            <label className="mb-0">
              Username <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="mb-0">
              Password <span className="text-danger">*</span>
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            className="btn btn-primary btn-lg w-100"
            value="Login"
          />
          {errorMessage && <div className="error"> {errorMessage} </div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
