import React from "react";
import { Link } from "react-router-dom";
import { IoIosBookmarks } from "react-icons/io";

import classes from "./Header.module.scss";

const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes["title-wrapper"]}>
        <IoIosBookmarks className={classes.icon} />
        <h1>172v Book Ratings</h1>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/landing-page">View All Books</Link>
          </li>
          <li>
            <Link to="/search-by-title">Search By Title</Link>
          </li>
          <li>
            <Link to="/search-by-author">Search By Author</Link>
          </li>
          <li>
            <Link to="/add-new-book">Add New Book</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
