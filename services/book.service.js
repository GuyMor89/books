import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { defaultBooks } from '../services/books.js'

const storageKey = 'BookDB'
var gFilterBy = { txt: '', minSpeed: 0 }

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
            // if (gFilterBy.txt) {
            //     const regex = new RegExp(gFilterBy.txt, 'i')
            //     books = books.filter(book => regex.test(book.title))
            // }
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
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
    return gFilterBy
}