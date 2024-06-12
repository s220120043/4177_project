/**
 * Author: Yuchen Ye
 * Souce URL 1: https://www.youtube.com/watch?v=yITlR9vDXXo&t=0s
 * Souce URL 2: https://www.youtube.com/watch?v=CrtmSbz6k5E
 * The detail of using this source please go to the README file
**/
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./css/bookDetails.css"

function BookDetails() {
  //decleared the variables 
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");

  //Use fetch method to fetch the data from the google api and mongoDB
  useEffect(() => {
    // Fetch book details
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((error) => console.log(error));

    // Fetch reviews
    fetch(`https://four177-group-20-project-backend.onrender.com/api/reviews/${id}`)
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.log(error));
  }, [id]);

  //handleChange method to set the name and review
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  //handleSubmit method to handle the submit button to upload the data by using the post method
  const handleSubmit = (event) => {
    event.preventDefault();
    const review = { name, review: body, bookId: id };
    fetch("https://four177-group-20-project-backend.onrender.com/api/reviews/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    })
      //clean the input 
      .then(() => {
        setReviews([...reviews, review]);
        setName("");
        setBody("");
      })
      .catch((error) => console.log(error));
  };

  //prevent the book is not displayed
  if (!book) {
    return <div>Loading book details...</div>;
  }

  //detect the book
  const { volumeInfo } = book;

  return (
    <div>
      <div className="book-details">
        {/*  Display the book details */}
        <h1>{volumeInfo.title}</h1>
        <h5><span>Author: </span>{volumeInfo.authors && volumeInfo.authors.join(", ")}</h5>
        <h5><span>Publish Date: </span>{volumeInfo.publishedDate}</h5>
        <h3>Introduction:</h3>
        <img
          src={volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail}
          alt={volumeInfo.title}
        />
        <p>{volumeInfo.description}</p>

        {/* Using form to require the review */}
        <h3>Add Review</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={handleNameChange}
            />
          </div>
          <div className="form-input">
            <textarea
              name="body"
              cols="30"
              rows="10"
              value={body}
              placeholder="Enter your review"
              onChange={handleBodyChange}
            ></textarea>
          </div>

          <button>Submit</button>
        </form>


        {/* An ul list to display the review */}
        <h3>Reviews</h3>
        <ul>
          {reviews.map((review) => (
            <li key={review._id}>
              <p><span>{review.name}</span> says:</p>
              <p className="border-review">{review.review}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BookDetails;