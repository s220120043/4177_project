import React from "react";

// Book for the review on the page.
import Book from "../images/dune.jpg";

// Title of the book
var bookTitle = "Dune";

const addReview = () => {
  return (
    <div className="App">
      <div id="Content-Main" className="container bg-secondary">
        <div className="d-flex justify-content-between">
          <h1>Add your review for {bookTitle}:</h1>
        </div>
        <div>
          <div className="row">
            <div className="col">
              <img
                src={Book}
                className="img-thumbnail img-fluid"
                alt=""
              />
            </div>
            <div className="col-10">
            <form>
                <div class="form-group">
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default addReview;
