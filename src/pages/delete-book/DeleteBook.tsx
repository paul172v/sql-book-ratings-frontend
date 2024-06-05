import React, { useState, useEffect, FormEvent } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import classes from "./DeleteBook.module.scss";

import Card from "../../components/card/Card";

const DeleteBook = () => {
  const [dataHasLoaded, setDataHasLoaded] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  //// Params
  const { id: paramId } = useParams();

  //// Functions
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!title || !author || rating === undefined) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/v1/book/${paramId}`);
      alert("Book Deleted Successfully");
      setDataHasLoaded(false);
    } catch (error) {
      console.error("There was an error deleting the book:", error);
    }
  };

  //// useEffect
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/book/${paramId}`
        );
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setRating(Number(res.data.rating));
        setDataHasLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBooks();
  }, []);

  return (
    <>
      <div className={classes["page-wrapper"]}>
        <form className={classes.form} onSubmit={submitHandler}>
          <h2 className={classes.heading}>Delete Book</h2>
          <p className={classes.message}>Do you wish to delete this book?</p>
          <input
            type="submit"
            value="Delete Book"
            className={classes["submit-button"]}
          />
        </form>
      </div>

      {dataHasLoaded && (
        <Card
          key={paramId}
          id={Number(paramId)}
          title={title}
          author={author}
          rating={rating}
          hasButtons={false}
        />
      )}
    </>
  );
};

export default DeleteBook;
