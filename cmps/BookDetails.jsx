

export function BookDetails({ chosenBook, changeChosenBook }) {

    const { title, subtitle, description, thumbnail } = chosenBook

    return (
        <article className="book-details-container">
            <div className="book-details">
                <h2>{title}</h2>
                <h3>{subtitle}</h3>
                <img src={thumbnail}></img>
                <h4>{description}</h4>
                <button onClick={() => changeChosenBook(event, 'back')}>Back</button>
            </div>
        </article>
    )
}