import { bookService } from "../services/book.service.js"
import { BookList } from './BookList.jsx'
import { BookFilter } from "./BookFilter.jsx"

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState({ text: '' })

    useEffect(() => {
        bookService.query()
            .then(setBooks)
    }, [filterBy])

    function changeFilterBy(event) {
        const text = event.target.value
        const newFilterBy = { ...filterBy, text }

        setFilterBy(newFilterBy)
        bookService.setFilterBy(newFilterBy)
    }

    if (!books) return (
        <article className="loader type-loader">
            <div className="ball ball1"></div>
            <div className="ball ball2"></div>
            <div className="ball ball3"></div>
        </article>
    )

    return (
        <section className="book-index">
            <BookFilter changeFilterBy={changeFilterBy} />
            <BookList books={books} />
        </section>
    )
}