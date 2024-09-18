import { bookService } from "../services/book.service.js"
import { storageService } from "../services/async-storage.service.js"

import { BookList } from './BookList.jsx'
import { BookFilter } from "./BookFilter.jsx"
import { BookDetails } from "./BookDetails.jsx"
import { Loader } from "./Loader.jsx"

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState({ text: '' })
    const [chosenBook, setChosenBook] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        bookService.query()
            .then(setBooks)
            .then(() => setIsLoading(false))
    }, [filterBy])

    function changeFilterBy(event) {
        const text = event.target.value
        const newFilterBy = { ...filterBy, text }

        setFilterBy(newFilterBy)
        bookService.setFilterBy(newFilterBy)
    }

    function changeChosenBook(event, back) {
        if (back) return setChosenBook(null)

        setIsLoading(true)

        const bookID = event.target.id

        bookService.get(bookID)
            .then(setChosenBook)
            .then(() => setIsLoading(false))
    }

    if (isLoading) return (
        <React.Fragment>
        <BookFilter changeFilterBy={changeFilterBy} />
        <Loader />
        </React.Fragment>
    )

    return (
        <section className="book-index">
            <BookFilter changeFilterBy={changeFilterBy} />
            {chosenBook && <BookDetails chosenBook={chosenBook} changeChosenBook={changeChosenBook} />}
            {!chosenBook && <BookList books={books} changeChosenBook={changeChosenBook} />}
        </section>
    )
}