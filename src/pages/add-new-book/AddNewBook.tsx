import React, { useState, FormEvent } from "react";
import axios from "axios";

import classes from "./AddNewBook.module.scss";

const AddNewBook: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [rating, setRating] = useState<number | undefined>(undefined);

  //// Functions
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!title || !author || rating === undefined) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/v1/book", {
        title,
        image: "new-book.jpg",
        author,
        rating,
      });
      alert("Book Added Successfully");
      setTitle("");
      setAuthor("");
      setRating(undefined);
    } catch (error) {
      console.error("There was an error adding the book:", error);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <h2 className={classes.heading}>Add New Book</h2>
      <div className="u-row">
        <label htmlFor="title">Book Title:</label>
        <input
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="u-row">
        <label htmlFor="author">Book Author:</label>
        <input
          name="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div className="u-row">
        <label htmlFor="rating">Book Rating:</label>
        <input
          name="rating"
          type="number"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
      </div>
      <input
        type="submit"
        value="Add Book"
        className={classes["submit-button"]}
      />
    </form>
  );
};

export default AddNewBook;
