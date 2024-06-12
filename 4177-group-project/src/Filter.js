import './css/Filter.css'
import BookSearch from "./bookSearch";

import React, { useState, useEffect } from 'react';


export default function Filter() {
    //const [books, setBooks] = useState([]);

//     useEffect(() => {
//         axios.get('http://localhost:8080/api')
//             .then(response => {
//                 setBooks(response.data);
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     }, []);
   

    return (
        <React.Fragment>
            <h1 style={{ textAlign: "center" }}>Home</h1>
            <BookSearch />
        </React.Fragment>

    )
}
