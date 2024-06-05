import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import classes from "./App.module.scss";
import Header from "./components/header/Header";
import LandingPage from "./pages/landing-page/LandingPage";
import SearchByTitle from "./pages/search-by-title/SearchByTitle";
import SearchByAuthor from "./pages/search-by-author/SearchByAuthor";
import AddNewBook from "./pages/add-new-book/AddNewBook";
import EditBook from "./pages/edit-book/EditBook";
import DeleteBook from "./pages/delete-book/DeleteBook";

function App() {
  return (
    <BrowserRouter>
      <img
        src="/public/bg.svg"
        alt="background"
        className={classes.background}
      />
      <Header />
      <div className={classes["page-wrapper"]}>
        <Routes>
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/search-by-title" element={<SearchByTitle />} />
          <Route path="/search-by-author" element={<SearchByAuthor />} />
          <Route path="/add-new-book" element={<AddNewBook />} />
          <Route path="/edit-book/:id" element={<EditBook />} />
          <Route path="/delete-book/:id" element={<DeleteBook />} />

          <Route path="*" element={<Navigate replace to="/landing-page" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

///// <a href="https://www.svgbackgrounds.com/category/geometric/">Geometric Backgrounds by SVGBackgrounds.com</a>
