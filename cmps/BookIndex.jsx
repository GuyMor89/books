import { bookService } from "../services/book.service.js"

import { BookList } from './BookList.jsx'
import { BookFilter } from "./BookFilter.jsx"
import { Loader } from "./Loader.jsx"

const { useState, useEffect } = React
const { useNavigate, Outlet, useLocation} = ReactRouterDOM

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState({ text: '', price: '' })
    const [chosenBook, setChosenBook] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()

    const isRootPath = location.pathname === '/books'

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query()
            .then(setBooks)
            .then(() => setIsLoading(false))
    }

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

        setFilterBy(newFilterBy)
        bookService.setFilterBy(newFilterBy)
    }

    function changeChosenBook(event, type) {
        if (type === 'back') return setChosenBook(null)

        setIsLoading(true)

        const bookID = event.target.id

        bookService.get(bookID)
            .then(setChosenBook)
            .then(() => {
                setIsLoading(false)
            })
    }

    function changeIsEditing(type) {
        if (type === 'back') return setIsEditing(false)
        setIsEditing(true)
    }

    function editBook(formData) {
        setIsLoading(true)

        bookService.get(chosenBook.id)
            .then(result => {
                setIsEditing(false)
                const editedBook = { ...result, ...formData }
                setChosenBook(editedBook)
                return bookService.save(editedBook)
            })
            .then(() => {
                loadBooks()
            })
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
            {/* {chosenBook && !isEditing && <BookDetails chosenBook={chosenBook} changeChosenBook={changeChosenBook} changeIsEditing={changeIsEditing} />} */}
            {isRootPath ? (<BookList books={books} filterBy={filterBy} />) : (<Outlet />)}
            {/* {chosenBook && isEditing && <BookEdit chosenBook={chosenBook} changeIsEditing={changeIsEditing} editBook={editBook} />} */}
        </section>
    )
}