
export function BookFilter({ changeFilterBy, filterBy }) {
    return (
        <article className="filter-container">
            <fieldset>
                <legend>Filter</legend>
                <label htmlFor="search-text">Title</label>
                <input onChange={changeFilterBy} value={filterBy && filterBy.text || ''} type="text" name="search-text" placeholder="Search.."></input>
                <label htmlFor="search-price">Price</label>
                <div>{filterBy && filterBy.price || 0}</div>
                <input onChange={changeFilterBy} type="range" name="search-price" value={filterBy && filterBy.price || 0} min={0} max={200}></input>
            </fieldset>
        </article>
    )
}
