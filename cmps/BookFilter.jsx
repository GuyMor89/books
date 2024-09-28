const { useEffect, useRef } = React

export function BookFilter({ changeFilterBy, filterBy }) {

    let emptyListener = useRef(null)
    const input = useRef(null)

    useEffect(() => {
        emptyListener = $(input.current).on('input', event => {
            if (event.target.value === '') changeFilterBy(event, 'reset')
        })
        return (() => {
            $(input.current).off('input', emptyListener)
            changeFilterBy(event, 'reset')
        })
    }, [])

    return (
        <article className="filter-container">
            <fieldset>
                <legend>Filter</legend>
                <label htmlFor="search-text">Title</label>
                <input ref={input} onInput={changeFilterBy} defaultValue={filterBy && filterBy.text || ''} type="search" name="search-text" placeholder="Search.."></input>
                <label htmlFor="search-price">Price</label>
                <div>{filterBy && filterBy.price || 0}</div>
                <input onChange={changeFilterBy} type="range" name="search-price" defaultValue={filterBy && filterBy.price || 0} min={0} max={200}></input>
            </fieldset>
        </article>
    )
}
