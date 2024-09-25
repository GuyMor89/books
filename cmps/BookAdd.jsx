import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

export function BookAdd() {

    const [isLoading, setIsLoading] = useState(true)

    const params = useParams()

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
                console.log(result)

                const { title, author_name, first_publish_year, number_of_pages_median, cover_i } = result.docs[0]
                const data = { title, authors: author_name, publishedDate: first_publish_year, pageCount: number_of_pages_median, coverID: cover_i }
                const imgURL = { thumbnail: `https://covers.openlibrary.org/b/id/${data.coverID}-L.jpg` }

                const newBook = { ...bookTemplate, ...data, ...imgURL }
                // return bookService.save(newBook)
            })
        // .then(result => {
        //     setFilterBy({ text: '', price: '' })
        //     bookService.setFilterBy({ text: '', price: '' })
        //     setIsLoading(false)
        //     navigate(`/books/${result.id}`)
        // })
    }

    return (
        <div></div>
    )
}