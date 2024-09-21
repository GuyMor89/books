import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books, changeChosenBook, addBook }) {
    return (
        <article className="book-list">
            {books.length > 0 && books.map(book =>
                <BookPreview key={book.id} book={book} changeChosenBook={changeChosenBook}/>
            )}
            {books.length < 1 && <article className="empty-books">
                <h2>No books found..</h2>
                <button onClick={addBook}>Add Book!</button>
            </article>}
        </article>
    )
}
