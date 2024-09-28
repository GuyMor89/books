import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"

import { BookList } from './BookList.jsx'
import { BookFilter } from "./BookFilter.jsx"
import { Loader } from "./Loader.jsx"

const { useState, useEffect } = React
const { useNavigate, Outlet, useLocation } = ReactRouterDOM

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState({ text: '', price: '' })
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()
    const location = useLocation()

    const isRootPath = location.pathname === '/books'

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    useEffect(() => {
        // if (books && books.length === 0 && filterBy.text !== '') navigate(`/books/add/${filterBy.text}`)
    }, [books])

    function loadBooks() {
        return bookService.query()
            .then(setBooks)
            .then(() => setIsLoading(false))
    }

    const debounceFilters = utilService.debounce((filter) => {
        setFilterBy(filter)
        bookService.setFilterBy(filter)
    }, 1000)

    function changeFilterBy(event, reset) {
        if (reset) {
            setFilterBy({ text: '', price: '' })
            return bookService.setFilterBy({ text: '', price: '' })
        }
        const input = event.target.value
        let newFilterBy

        if (event.nativeEvent.inputType) {
            const text = input
            newFilterBy = { ...filterBy, text }
        } else {
            const price = input
            newFilterBy = { ...filterBy, price }
        }
        debounceFilters(newFilterBy)
    }
    if (isLoading) return (
        <React.Fragment>
            <BookFilter changeFilterBy={changeFilterBy} filterBy={filterBy} />
            <Loader />
        </React.Fragment>
    )
    return (
        <section className="book-index">
            <BookFilter changeFilterBy={changeFilterBy} filterBy={filterBy} />
            {isRootPath ? (<BookList books={books} filterBy={filterBy} />) : (<Outlet />)}
        </section>
    )
}