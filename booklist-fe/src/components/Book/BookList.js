import React from "react";
import "./BookList.css";
import Table from "./Table";

const BookList = () => {
  return (
    <div className="card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">
      <div className="card-header bg-transparent border-0 text-center text-uppercase">
        <h3>Bücherliste</h3>
      </div>
      <Table/>

    </div>
  );
};

export default BookList;
