import React from "react";
import { Link } from "react-router-dom";

import classes from "./Card.module.scss";

interface IBook {
  id: number;
  title: string;
  author: string;
  rating: number;
}

interface IProps extends IBook {
  hasButtons?: boolean;
}

const Card = (props: IProps) => {
  return (
    <div className={classes.card}>
      <div className={classes["image-box"]}>
        <img className={classes.img} src="/public/new-book.jpg" alt="cover" />
      </div>
      <div className={classes["text-box"]} id={classes.title}>
        <h2> {props.title}</h2>
      </div>
      <div className={classes["text-box"]} id={classes.author}>
        <p>{props.author}</p>
      </div>
      <div className={classes["text-box"]} id={classes.rating}>
        <p>{props.rating} ⭐</p>
      </div>
      <div className={classes["button-box"]}>
        {props.hasButtons === true && (
          <div className={classes["u-col"]}>
            <Link to={`/edit-book/${props.id}`}>
              <button className={classes["button"]} onClick={() => {}}>
                Edit Book
              </button>
            </Link>

            <Link to={`/delete-book/${props.id}`}>
              <button className={classes["button"]} onClick={() => {}}>
                Delete Book
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
