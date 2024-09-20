export function BookPreview({ book, changeChosenBook }) {

    const {title, thumbnail, id} = book

    return (
        <div className="book-preview" id={id} onClick={changeChosenBook}>
            <h3><span>{title}</span></h3>
            <img src={thumbnail}></img>
        </div>
    )
}