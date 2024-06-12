//Author: Kaushik Dhamodaran
import { useState,useEffect } from "react";
import axios from "axios";
//adding link component
import { Link } from "react-router-dom";
import "./css/bookSearch.css";

const BookSearch = () => {
  //Defines constants 
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  //Google books API key
  const [apiKey, setApiKey] = useState("AIzaSyDayUQL9JZHgC_Yk5rQFtFgfK59208X2JY")

  //Gets data from google books
  useEffect(() => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=javascript&maxResults=40`;
    axios.get(url).then((response) => setBooks(response.data.items));
  }, []);

  //Handles search query by getting from API
  const HandleSearch = async (e) => {
    e.preventDefault();
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`;
    const response = await axios.get(url);
    setBooks(response.data.items);
  };

  //Display books in 40 in a page(Yu/chen)
  const handleBorrow = (book) => {
    let averageRating;
    !book.volumeInfo.averageRating ? (averageRating = null) : (averageRating = book.volumeInfo.averageRating)
    const bookDetails = { title: book.volumeInfo.title, pageCount: book.volumeInfo.pageCount,
      description: book.volumeInfo.description, averageRating: averageRating, thumbnail: book.volumeInfo.imageLinks.thumbnail,
      bookID: book.id, userID: "test@test.ca" };

    fetch("https://four177-group-20-project-backend.onrender.com/api/bookHistory/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookDetails),
    }).then(() => {
      //setBorrowedBooks([...borrowedBooks, book]);
    }).catch((error) => console.log(error));
    let borrowBtn = document.getElementById(`borrow-${book.id}`);
    borrowBtn.disabled = true;
    borrowBtn.innerText = "Success!"
  };

  return (
    <div>
      {/*<h3>Borrowed books</h3>*/}
      {/*<ul>*/}
      {/*  {borrowedBooks.map((book) => (*/}
      {/*    <li key={book.id}>{book.volumeInfo.title}</li>*/}
      {/*  ))}*/}
      {/*</ul>*/}

      <form onSubmit={HandleSearch} style={{ textAlign: "center" }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Books"
        />
        <button type="submit">Search</button>
      </form>
      {books.map((book) => (
        <div key={book.id} className="book-card">
          <Link to={`/books/${book.id}`} key={book.id} className="book-card">
            <img
              src={book.volumeInfo.imageLinks?.thumbnail}
              alt={`${book.volumeInfo.title} cover`}
            />
            <h2>{book.volumeInfo.title}</h2>
          </Link>
          <p>{book.volumeInfo.subtitle}</p>
          <p>{book.volumeInfo.authors?.join(", ")}</p>
          <p>Price: {book.saleInfo.listPrice?.amount}</p>
          <button  id={"borrow-"+book.id} onClick={() => handleBorrow(book)}>Borrow</button>
        </div>
      ))}
    </div>
  );
};

export default BookSearch;