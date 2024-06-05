import React, { useState, useEffect } from "react";
import axios from "axios";

import AllCardsWrapper from "../../components/all-cards-wrapper/AllCardsWrapper";

interface IBook {
  id: number;
  title: string;
  image: string;
  author: string;
  rating: number;
}

const LandingPage: React.FC = () => {
  const [dataHasLoaded, setDataHasLoaded] = useState(false);
  const [books, setBooks] = useState<IBook[]>([]);

  //// useEffect
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/book");
        setBooks(res.data);
        setDataHasLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBooks();
  }, []);

  return <>{dataHasLoaded && <AllCardsWrapper array={books} />}</>;
};

export default LandingPage;
