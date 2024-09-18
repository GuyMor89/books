export function BookPreview({ book, changeChosenBook }) {

    const {title, thumbnail, id} = book

    return (
        <div className="book-preview">
            <h3><span>{title}</span></h3>
            <img src={thumbnail}></img>
            <div className="btn-container">
                <button className="select-book" id={id} onClick={changeChosenBook}>Select</button>
                <button className="delete-book"><i className="fa-solid fa-xmark"></i></button>
            </div>
        </div>
    )
}