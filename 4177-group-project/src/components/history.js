import React, {useEffect, useState} from "react";
import {Link } from "react-router-dom";
import bookImg from '../images/book.svg';
import page from '../images/file-earmark-break.svg';
import clock from '../images/clock.svg';


function History() {
    const id = ("test@test.ca");
    let hasData = false;
    let totalPages = 0;
    let timeSpent = 0;
    const [history, setHistory] = useState([]);
    useEffect(() => {
        // Fetch bookHistory
        fetch(`https://four177-group-20-project-backend.onrender.com/api/bookHistory/${id}`)
            .then((response) => response.json())
            .then((data) => setHistory(data))
            .catch((error) => console.log(error));
    }, [id]);

    history.map(bookHist => {
        bookHist.bookHistory.map(book => {
            totalPages += book.pageCount
            timeSpent = Math.round((totalPages * 2) / 60)
            if (bookHist.bookHistory.length > 0){hasData = true}
        });
    })

    return (
        <div>{hasData ? (
            <div>{history.map((bookHist) => (
                <div className="App">
                    <div id="Content-Header" className="container p-2 my-1 text-white bg-secondary">
                        <div className="row">
                            <div className="col">
                                <img src={require('../images/pfp.jpg')} className="img-fluid" alt=""/>
                            </div>
                            <div className="col-9">
                                <h1>$(USERNAME)'s Statistics</h1>
                                <div className="container p-2 my-1 text-white">
                                    <div className="row">
                                        <div className="col">
                                            <h1><img src={bookImg} className="img-fluid" alt=""/></h1>
                                            <h2>{bookHist.bookHistory.length} Books read</h2>
                                        </div>
                                        <div className="col">
                                            <h1><img src={page} className="img-fluid" alt=""/></h1>
                                            <h2>{totalPages} Pages read</h2>
                                        </div>
                                        <div className="col">
                                            <img src={clock} className="img-fluid" alt=""/>
                                            <h2>Approx. {timeSpent} Hours spent reading</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="Content-Main" className="container bg-secondary">
                        <div className="d-flex justify-content-between">
                            <h1>Previous Reads:</h1>
                            {/*<Link type="button" className="btn btn-info" to='/addbook'><h1>+</h1></Link>*/}
                        </div>
                        <div id="History" className="row p-5 text-center ">
                            {bookHist.bookHistory.map(book => (
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <img src={book.thumbnail} className="img-thumbnail img-fluid"
                                                     alt={book.title}/>
                                            </div>
                                            <div className="col-10 text-start">
                                                <h5 className="book-title" key={book._id + "title"}>{book.title}</h5>
                                                <h5 className="book-rating" key={book._id + "avgRating"}>Average
                                                    Rating: {!book.averageRating ?  ("N/A") : (book.averageRating)}</h5>
                                                <h5 className="book-pages"
                                                    key={book._id + "pageCount"}>Pages: {book.pageCount}</h5>
                                                <p className="book-desc"
                                                   key={book._id + "desc"}>{dataTrim(book.description)}</p>
                                                <Link type="button" className="btn btn-primary" to={'/books/'+book.bookID}><h6>Go to book page</h6></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>))}
            </div>
        ) : (
            <div className="App">
                <div id="Content-Header" className="container p-2 my-1 text-white bg-secondary">
                    <div className="row">
                        <div className="col">
                            <img src={require('../images/pfp.jpg')} className="img-fluid" alt=""/>
                        </div>
                        <div className="col-9">
                            <h1>$(USERNAME)'s Statistics</h1>
                            <div className="container p-2 my-1 text-white">
                                <div className="row">
                                    <div className="col">
                                        <h1><img src={bookImg} className="img-fluid" alt=""/></h1>
                                        <h2>0 Books read</h2>
                                    </div>
                                    <div className="col">
                                        <h1><img src={page} className="img-fluid" alt=""/></h1>
                                        <h2>0 Pages read</h2>
                                    </div>
                                    <div className="col">
                                        <img src={clock} className="img-fluid" alt=""/>
                                        <h2>Approx. 0 Hours spent reading</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="Content-Main" className="container bg-secondary">
                    <div className="d-flex justify-content-between">
                        <h1>Previous Reads:</h1>
                        {/*<Link type="button" className="btn btn-info" to='/addbook'><h1>+</h1></Link>*/}
                    </div>
                    <div id="History" className="row p-5 text-center ">
                        <h3>No Previous books associated with this account.</h3>
                        <h5>You can add books by pressing the borrow button on the homepage!</h5>
                    </div>
                </div>
            </div>
        )}
        </div>
    )
}
function dataTrim(desc)
{   let text = desc;
    if (desc.length > 500) {
        text = desc.substring(0,(500))+"...";
    }
    return text;
}
export default History;