import { Home } from './cmps/Home.jsx'
import { BookIndex } from './cmps/BookIndex.jsx'

const { useState } = React

export function App() {

    const [page, setPage] = useState('book')

    return (
        <section className="app">
            <header className="app-header">
                <h1>Miss Books</h1>
                <article className='nav-bar'>
                    <a onClick={() => setPage('home')}>Home</a>
                    <a onClick={() => setPage('book')}>Book Index</a>
                </article>
            </header>
            <main className="container">
                {page === 'home' && <Home />}
                {page === 'book' && <BookIndex />}
            </main>
        </section>
    )
}