
export function BookFilter({ changeFilterBy }) {

    return (
        <article className="filter-container">
            <form>
                <label htmlFor="search-text">Search</label>
                <input onChange={changeFilterBy} type="text" name="search-text" placeholder="Filter by title.."></input>
            </form>
        </article>
    )
}