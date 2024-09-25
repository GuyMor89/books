import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { defaultBooks } from '../services/books.js'

const storageKey = 'BookDB'
var gFilterBy = { text: '' }

export const bookService = {
    query,
    get,
    remove,
    save,
    getFilterBy,
    setFilterBy
}

function query() {
    return storageService.query(storageKey)
        .then(books => {
            if (!books || !books.length > 0) {
                utilService.saveToStorage(storageKey, defaultBooks)
                return utilService.loadFromStorage(storageKey)
            }
            if (gFilterBy.text) {
                console.log(gFilterBy.text)
                const regex = new RegExp(gFilterBy.text, 'i')
                books = books.filter(book => regex.test(book.title))
                console.log(books)
            }
            if (gFilterBy.price) {
                books = books.filter(book => book.listPrice.amount >= +gFilterBy.price)
            }
            return books
        })
}

function get(bookID) {
    return storageService.get(storageKey, bookID)
}

function remove(bookID) {
    return storageService.remove(storageKey, bookID)
}

function save(book) {
    if (book.id) {
        return storageService.put(storageKey, book)
    } else {
        return storageService.post(storageKey, book)
    }
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.text !== undefined) gFilterBy.text = filterBy.text
    if (filterBy.price !== undefined) gFilterBy.price = filterBy.price
    return gFilterBy
}