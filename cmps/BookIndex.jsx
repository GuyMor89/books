import { bookService } from "../services/book.service.js"
import { BookList } from './BookList.jsx'

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)

    useEffect(() => {
        bookService.query()
            .then(setBooks)
    }, [])


    if (!books) return (
        <article className="loader type-loader">
            <div className="ball ball1"></div>
            <div className="ball ball2"></div>
            <div className="ball ball3"></div>
        </article>
    )

    return (
        <section className="book-index">
            <BookList books={books} />
        </section>
    )
}