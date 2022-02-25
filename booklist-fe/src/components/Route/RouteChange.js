import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "../LoginPage/Login";
import AddBook from "../Book/AddBook";
import BookList from "../Book/BookList";
import Header from "../Header/Header";

const RouteChange = () => {
  return (
    
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/Login" element={<Login />} />
      <Route path="/AddBook" element={<AddBook />} />
      <Route path="/BookList" element={<BookList />} />
      <Route path="/Header" element={<Header />} />
    </Routes>
  );
};

export default RouteChange;
