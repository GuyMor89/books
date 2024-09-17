import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books }) {
    return (
        <article className="book-list">
            {books.map(book =>
                <BookPreview key={book.id} book={book}/>
            )}
        </article>
    )
}
