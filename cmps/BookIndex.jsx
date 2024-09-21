import { bookService } from "../services/book.service.js"
import { storageService } from "../services/async-storage.service.js"

import { BookList } from './BookList.jsx'
import { BookFilter } from "./BookFilter.jsx"
import { BookDetails } from "./BookDetails.jsx"
import { BookEdit } from "./BookEdit.jsx"
import { Loader } from "./Loader.jsx"

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState({ text: '', price: '' })
    const [chosenBook, setChosenBook] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        bookService.query()
            .then(setBooks)
            .then(() => setIsLoading(false))
    }, [filterBy])

    function changeFilterBy(event) {
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
        if (type === 'back') {
            return setChosenBook(null)
        }

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
                return bookService.query()
            })
            .then(result => {
                setBooks(result)
                setIsLoading(false)
            })
    }

    function addBook() {
        setIsLoading(true)

        const API_PREFIX = 'https://openlibrary.org/search.json?q='
        const API_URL = `${API_PREFIX}${filterBy.text}`

        const bookTemplate = {
            "id": "",
            "title": "",
            "subtitle": "",
            "authors": "",
            "publishedDate": 0,
            "description": "",
            "pageCount": 0,
            "categories": "",
            "thumbnail": "",
            "language": "en",
            "listPrice": {
                "amount": 0,
                "currencyCode": "USD",
                "isOnSale": false
            }
        }
        fetch(API_URL)
            .then(result => result.json())
            .then(result => {
                const { title, author_name, first_publish_year, number_of_pages_median, cover_i } = result.docs[0]
                const data = { title, authors: author_name, publishedDate: first_publish_year, pageCount: number_of_pages_median, coverID: cover_i }
                const imgURL = { thumbnail: `https://covers.openlibrary.org/b/id/${data.coverID}-L.jpg` }

                const newBook = { ...bookTemplate, ...data, ...imgURL }
                return bookService.save(newBook)
            })
            .then(result => {
                setFilterBy({ text: '', price: '' })
                bookService.setFilterBy({ text: '', price: '' })
                setChosenBook(result)
                setIsLoading(false)
            })
    }

    if (isLoading) return (
        <React.Fragment>
            <BookFilter changeFilterBy={changeFilterBy} filterBy={filterBy} addBook={addBook} />
            <Loader />
        </React.Fragment>
    )

    return (
        <section className="book-index">
            <BookFilter changeFilterBy={changeFilterBy} filterBy={filterBy} />
            {chosenBook && !isEditing && <BookDetails chosenBook={chosenBook} changeChosenBook={changeChosenBook} changeIsEditing={changeIsEditing} />}
            {!chosenBook && <BookList books={books} changeChosenBook={changeChosenBook} addBook={addBook} />}
            {chosenBook && isEditing && <BookEdit chosenBook={chosenBook} changeIsEditing={changeIsEditing} editBook={editBook} />}
        </section>
    )
}