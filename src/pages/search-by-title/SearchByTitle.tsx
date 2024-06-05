import React, { useState, useRef, FormEvent } from "react";
import axios from "axios";

import classes from "./SearchByTitle.module.scss";
import AllCardsWrapper from "../../components/all-cards-wrapper/AllCardsWrapper";

interface IBook {
  id: number;
  title: string;
  image: string;
  author: string;
  rating: number;
}

const SearchByTitle: React.FC = () => {
  const [bookArray, setBookArray] = useState<IBook[] | null>(null);

  //// Refs
  const titleRef = useRef<HTMLInputElement>(null);

  //// Functions
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const title = titleRef.current?.value;

    if (!title) {
      alert("Please enter a title");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/book/search/title",
        {
          title,
        }
      );
      if (response.data === null) {
        alert("Book Not Found");
      } else {
        setBookArray([response.data]);
      }
    } catch (error) {
      console.error("There was an error fetching the books:", error);
    }
  };

  return (
    <div className={classes["page-wrapper"]}>
      <form className={classes.form} onSubmit={submitHandler}>
        <h2 className={classes.heading}>Search By Title</h2>
        <div className="u-row">
          <label htmlFor="title">Book Title:</label>
          <input ref={titleRef} name="title" type="text" />
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

export default SearchByTitle;
