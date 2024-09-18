
export function BookFilter({ changeFilterBy }) {

    return (
        <article className="filter-container">
            <fieldset>
                <legend>Filter</legend>
                <input onChange={changeFilterBy} type="text" name="search-text" placeholder="Filter by title.."></input>
            </fieldset>
        </article>
    )
}