import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books, changeChosenBook }) {
    return (
        <article className="book-list">
            {books.map(book =>
                <BookPreview key={book.id} book={book} changeChosenBook={changeChosenBook}/>
            )}
        </article>
    )
}
