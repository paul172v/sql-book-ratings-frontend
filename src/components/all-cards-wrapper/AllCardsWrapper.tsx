import React from "react";

import classes from "./AllCardsWrapper.module.scss";

import Card from "../../components/card/Card";

interface IBook {
  id: number;
  title: string;
  image: string;
  author: string;
  rating: number;
}

interface IProp {
  array: IBook[];
}

const AllCardsWrapper: React.FC<IProp> = (props) => {
  return (
    <div className={classes["all-cards-wrapper"]}>
      {props.array.map((el: IBook) => {
        return (
          <Card
            key={el.id}
            id={el.id}
            title={el.title}
            author={el.author}
            rating={el.rating}
            hasButtons={true}
          />
        );
      })}
    </div>
  );
};

export default AllCardsWrapper;
