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
            <footer>
                <div></div>
                <div>Copyright
                    <i className="fa-regular fa-copyright"></i>
                    2024<span data-i18n="footerBy">by Guy Mor</span>
                </div>
                <a></a>
            </footer>
        </section>
    )
}