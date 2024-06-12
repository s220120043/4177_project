import React from "react";
import {Link} from "react-router-dom";

function HistoryNone() {
    return (
        <div id="formLayout" className="container p-2 my-1 text-white bg-secondary">
            <form className="was-validated">
                <div className="form-row">
                        <h1 className="col px-2 mx-2">Add Book:</h1>
                        <div className="col px-5 mx-5">
                            <label htmlFor="validationServer01">Book Title</label>
                            <input type="text" className="form-control" id="validationServer01"
                                   placeholder="Dune" required/>
                            <div className="valid-feedback">Valid.</div>
                            <div className="invalid-feedback">Please enter the book title.</div>
                        </div>
                        <div className="col px-5 mx-5">
                            <label htmlFor="validationServer02">Author</label>
                            <input type="text" className="form-control" id="validationServer02"
                                   placeholder="Frank Herbert" required/>
                            <div className="valid-feedback">Valid.</div>
                            <div className="invalid-feedback">Please enter Author name.</div>
                        </div>
                        <div className="col px-5 mx-5">
                            <label htmlFor="validationServer02">Pages</label>
                            <input type="number" className="form-control" id="validationServer02" placeholder="####"
                                   required/>
                            <div className="valid-feedback">Valid.</div>
                            <div className="invalid-feedback">Please enter number of pages.</div>
                        </div>
                </div>

                <h1 className="col px-2 mx-2">Optional:</h1>
                <div className="row pb-5">
                    <div className="col px-5 mx-5">
                        <label htmlFor="validationServer04">Upload Cover Image</label>
                        <input type="file" className="form-control" id="customFile" />
                    </div>
                    <div className="col px-5 mx-5">
                        <label htmlFor="validationServer05">Personal Rating</label>
                        <input type="number" className="form-control" id="validationServer05"
                               placeholder="Rating out of 5" min="1" max="5"/>
                            <div className="invalid-feedback">
                                Please provide a number between 1 and 5.
                            </div>
                    </div>
                </div>
            </form>
            <div className="row p-5">
                <div className="d-grid gap-2 col-3 mx-auto pt-5">
                    <Link type="button" className="btn btn-primary btn-lg" to='/history'><h1>Save</h1></Link>
                </div>
                <div className="d-grid gap-2 col-3 mx-auto pt-5">
                    <Link type="button" className="btn btn-warning btn-lg" to='/historyNone'><h1>Cancel</h1></Link>
                </div>
            </div>
        </div>
    );
}



export default HistoryNone;