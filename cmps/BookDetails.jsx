import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { LongText } from "./LongText.jsx"
import { AddReview } from "./AddReview.jsx"
import { Loader } from "./Loader.jsx"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

export function BookDetails({ }) {

    const [book, setBook] = useState(null)
    const [prevBook, setPrevBook] = useState(null)
    const [nextBook, setNextBook] = useState(null)
    const [isAdding, setIsAdding] = useState(false)
    const [areReviewsOpen, setAreReviewsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBooks()
    }, [params.bookID])

    function loadBooks() {
        bookService.query()
            .then(result => {
                const currentBook = result.find(book => book.id === params.bookID)
                setBook(currentBook)
                setPrevBook(result.find((book, idx) => idx === result.findIndex(book => book.id === currentBook.id) - 1))
                setNextBook(result.find((book, idx) => idx === result.findIndex(book => book.id === currentBook.id) + 1))
            })
            .then(() => setIsLoading(false))
            .catch(err => {
                console.log('Error: Couldn\'t find book..', err)
                showErrorMsg('Error: Couldn\'t find book..')
                navigate('/books')
            })
    }

    function removeReview(bookID, reviewID) {
        bookService.get(bookID)
            .then(result => {
                const newReviews = result.reviews.filter(review => review.id !== reviewID)
                const newBook = { ...result, reviews: newReviews }
                return bookService.save(newBook)
            })
            .then(result => setBook(result))
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

    function StarRating({ rating }) {
        return (
            <span>
                {Array.from({ length: +rating }, (_, index) => (
                    <i key={index} className="fa-solid fa-star"></i>
                ))}
            </span>
        )
    }

    if (isLoading) return <Loader />

    const { title, authors, subtitle, description, thumbnail, pageCount, publishedDate, listPrice } = book
    const { isOnSale, currencyCode, amount } = listPrice

    return (
        <article className="book-details-container">
            <div className="book-details">
                <div className="btn-container">
                    <button onClick={() => navigate('/books')}>Back</button>
                    <button onClick={() => navigate(`/books/edit/${book.id}`)}>Edit</button>
                </div>
                <button onClick={() => navigate(`/books/${prevBook.id}`)}><i className="fa-solid fa-arrow-left-long"></i></button>
                <button onClick={() => navigate(`/books/${nextBook.id}`)}><i className="fa-solid fa-arrow-right-long"></i></button>
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
                <button onClick={() => setAreReviewsOpen(!areReviewsOpen)}>{!areReviewsOpen && 'Open'} {areReviewsOpen && 'Close'} Reviews</button>
                {areReviewsOpen &&
                    <div className="book-review-container">
                        <button onClick={() => setIsAdding(true)}>Add Review</button>
                        {isAdding && <AddReview book={book} setBook={setBook} setIsAdding={setIsAdding} />}
                        <h2>Reviews</h2>
                        {book.reviews && book.reviews.length === 0 && !isAdding && <h3>No Reviews..</h3>}
                        {book.reviews && book.reviews.map(({ id, name, rating, readAt, review }) => {
                            return <div key={id} className="book-review">
                                <button onClick={() => removeReview(book.id, id)}>X</button>
                                <h3>Name</h3><span>{name}</span>
                                <h4>Rating</h4><StarRating rating={rating} />
                                <h5>Read At</h5><span>{readAt}</span>
                                <h4>Review</h4><span>{review}</span>
                            </div>
                        })}
                    </div>}
            </div>
        </article>
    )
}