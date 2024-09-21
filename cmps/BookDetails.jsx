
export function BookDetails({ chosenBook, changeChosenBook, changeIsEditing }) {

    const { title, authors, subtitle, description, thumbnail, pageCount, publishedDate, listPrice } = chosenBook
    const { isOnSale, currencyCode, amount } = listPrice

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

    return (
        <article className="book-details-container">
            <div className="book-details">
                <h2>{title}</h2>
                <h3>{subtitle}</h3>
                <h4>{[...authors]}</h4>
                <h5>{evaluateBookDifficulty()} ({pageCount} p.)</h5>
                <div className="image-container">
                    <img src={thumbnail}></img>
                    {isOnSale && <span>On Sale</span>}
                </div>
                <h6>({publishedDate}) - {evaluateBookAge()}</h6>
                <h4>{description}</h4>
                <span className={evaluatePriceColor()}>{amount} {currencyCode}</span>
                <div className="btn-container">
                    <button onClick={() => changeChosenBook(event, 'back')}>Back</button>
                    <button onClick={changeIsEditing}>Edit</button>
                </div>
            </div>
        </article>
    )
}