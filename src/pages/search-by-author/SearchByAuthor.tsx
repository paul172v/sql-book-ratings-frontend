import React, { useState, useRef, FormEvent } from "react";
import axios from "axios";

import classes from "./SearchByAuthor.module.scss";
import AllCardsWrapper from "../../components/all-cards-wrapper/AllCardsWrapper";

interface IBook {
  id: number;
  title: string;
  image: string;
  author: string;
  rating: number;
}

const SearchByAuthor: React.FC = () => {
  const [bookArray, setBookArray] = useState<IBook[] | null>(null);

  //// Refs
  const authorRef = useRef<HTMLInputElement>(null);

  //// Functions
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const author = authorRef.current?.value;

    if (!author) {
      alert("Please enter a author");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/book/search/author",
        {
          author,
        }
      );
      if (response.data === null) {
        alert("Book Not Found");
      } else {
        setBookArray(response.data);
      }
    } catch (error) {
      console.error("There was an error fetching the books:", error);
    }
  };

  return (
    <div className={classes["page-wrapper"]}>
      <form className={classes.form} onSubmit={submitHandler}>
        <h2 className={classes.heading}>Search By Author</h2>
        <div className="u-row">
          <label htmlFor="author">Book Author:</label>
          <input ref={authorRef} name="author" type="text" />
        </div>
        <input
          type="submit"
          value="Search"
          className={classes["submit-button"]}
        />
      </form>

      {bookArray && <AllCardsWrapper array={bookArray} />}
    </div>
  );
};

export default SearchByAuthor;
