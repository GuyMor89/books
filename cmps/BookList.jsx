import { BookPreview } from "./BookPreview.jsx";

const { useNavigate } = ReactRouterDOM

export function BookList({ books, filterBy }) {

    const navigate = useNavigate()

    return (
        <article className="book-list">
            {books.length > 0 && books.map(book =>
                <BookPreview key={book.id} book={book}/>
            )}
            {books.length < 1 && <article className="empty-books">
                <h2>No books found..</h2>
                <button onClick={() => navigate(`/book/add/${filterBy.text}`)}>Add Book?</button>
            </article>}
        </article>
    )
}
