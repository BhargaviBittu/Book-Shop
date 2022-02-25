import React, {useState} from "react";
import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import AuthenticationService from "../service/AuthenticationService";

const Header = () => {
  let location = useLocation();
  const [isAdmin, setAdmin] = useState(false);
  const isLoggedIn = localStorage.getItem("loggedIn");
  const role = AuthenticationService.getUserRole();

  const handleLogout = (e) => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("role");
  };
  return (
    <div className="header">
      <div className="container">
        <div className="navbar">
          {isLoggedIn && (location.pathname != "/login")? (
            <ul>
            <li>
              {role === "ADMIN" ? "Logged in as Admin" : "Logged in as User"}
              </li>
              <li>
              {role === "ADMIN" ? 
                <NavLink
                  to="/AddBook"
                >
                  Add Book
                </NavLink>: ""}
              </li>
              <li>
                <NavLink
                  to="/BookList"
                >
                  Book List
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Login"
                  onClick={handleLogout}
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
