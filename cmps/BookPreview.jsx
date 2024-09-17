export function BookPreview({ book }) {

    return (
        <div className="book-preview">
            <h3><span>{book.title}</span></h3>
            <img src={book.thumbnail}></img>
            <div className="btn-container">
                <button className="select-book" id={book.id} onClick={() => console.log(event.target.id)}>Select</button>
                <button className="delete-book"><i className="fa-solid fa-xmark"></i></button>
            </div>
        </div>
    )
}