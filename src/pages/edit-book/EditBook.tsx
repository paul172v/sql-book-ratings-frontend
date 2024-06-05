import React, { useState, useEffect, FormEvent } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import classes from "./EditBook.module.scss";

const EditBook = () => {
  const [dataHasLoaded, setDataHasLoaded] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [rating, setRating] = useState<number | undefined>(undefined);

  //// Params
  const { id } = useParams();

  //// Functions
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!title || !author || rating === undefined) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await axios.patch(`http://localhost:5000/api/v1/book/${id}`, {
        title,
        image: "new-book.jpg",
        author,
        rating,
      });
      alert("Book Updated Successfully");
      setTitle("");
      setAuthor("");
      setRating(undefined);
    } catch (error) {
      console.error("There was an error updating the book:", error);
    }
  };

  //// useEffect
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/book/${id}`);
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setRating(res.data.rating);
        setDataHasLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBooks();
  }, []);

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <h2 className={classes.heading}>Edit Book</h2>
      {dataHasLoaded && (
        <>
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
            value="Edit Book"
            className={classes["submit-button"]}
          />
        </>
      )}
    </form>
  );
};

export default EditBook;
