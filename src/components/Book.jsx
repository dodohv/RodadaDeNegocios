import React, {useState} from 'react';
import AddBook from "../components/AddBook"
import BookList from './BooksList';
const Book = () => {
    const [bookId, setBookId] = useState("")
    const getBookIdHandler = (id) => {
        console.log("O Id do documento a ser editado ", id);
        setBookId(id);
    };
    return (
        <div>
            <AddBook id={bookId} setBookId={setBookId}/>
            <BookList getBookId={getBookIdHandler} />
 
        </div>
      );
}
 
export default Book;
