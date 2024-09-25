import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { LongText } from "./LongText.jsx"
import { Loader } from "./Loader.jsx"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

export function BookDetails({ }) {

    const [book, setBook] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [params.bookID])

    function loadBook() {
        bookService.get(params.bookID)
            .then(setBook)
            .then(() => setIsLoading(false))
            .catch(err => {
                console.log('Error: Couldn\'t find book..', err)
                showErrorMsg('Error: Couldn\'t find book..')
                navigate('/books')
            })
    }

    function evaluateBookDifficulty() {
        if (pageCount > 500) return 'Serious Read'
        if (pageCount > 100 && pageCount < 501) return 'Moderate Read'
        if (pageCount < 101) return 'Light Read'
    }

    function evaluateBookAge() {
        if (publishedDate < 2014) return 'Vintage'
        if (publishedDate < 2023 && publishedDate > 2013) return 'Contemporary'
        else return 'New'
    }

    function evaluatePriceColor() {
        if (currencyCode === 'EUR' || currencyCode === 'USD') {
            if (amount > 20) return 'red'
            else return 'green'
        }
        if (currencyCode === 'ILS') {
            if (amount > 80) return 'red'
            else return 'green'
        }
    }

    function parseAuthors() {
        const newAuthors = authors.map((author, idx) => {
            if (idx !== authors.length - 1) return `${author} & `
            return author
        })
        return newAuthors.join('')
    }

    if (isLoading) return <Loader />

    const { title, authors, subtitle, description, thumbnail, pageCount, publishedDate, listPrice } = book
    const { isOnSale, currencyCode, amount } = listPrice

    return (
        <article className="book-details-container">
            <div className="book-details">
                <h2>{title}</h2>
                <h3>{subtitle}</h3>
                <h4>{parseAuthors()}</h4>
                <h5>{evaluateBookDifficulty()} ({pageCount} p.)</h5>
                <div className="image-container">
                    <img src={thumbnail}></img>
                    {isOnSale && <span>On Sale</span>}
                </div>
                <h6>({publishedDate}) - {evaluateBookAge()}</h6>
                <LongText text={description} />
                <span className={evaluatePriceColor()}>{amount} {currencyCode}</span>
                <div className="btn-container">
                    <button onClick={() => navigate('/books')}>Back</button>
                    <button onClick={() => navigate(`/books/edit/${book.id}`)}>Edit</button>
                </div>
            </div>
        </article>
    )
}