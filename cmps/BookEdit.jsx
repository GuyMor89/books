const { useState, useEffect } = React

export function BookEdit({ chosenBook, changeIsEditing, editBook }) {

    const { title, subtitle, description, pageCount, publishedDate, listPrice } = chosenBook
    const { isOnSale, currencyCode, amount } = listPrice

    const [formData, setFormData] = useState({
        title: title,
        subtitle: subtitle,
        pageCount: pageCount,
        publishedDate: publishedDate,
        description: description,
        listPrice: { ['amount']: amount, ['isOnSale']: isOnSale, ['currencyCode']: currencyCode }
    })

    function updateData(event) {
        const { name, value } = event.target
        const parsedName = name.split('-')[0]

        if (parsedName === 'amount') {
           return setFormData(prevValue => ({
                ...prevValue, ['listPrice']: {...listPrice, [parsedName]: +value}
            }))
        }

        setFormData(prevValue => ({
            ...prevValue, [parsedName]: value
        }))
    }

    return (
        <article className="book-edit-container">
            <div className="book-edit">
                <h2>Edit Book
                    <br></br><span>({title})</span>
                </h2>
                <label htmlFor="title-edit">Title</label>
                <input onChange={updateData} type="text" name="title-edit" id="title-edit" defaultValue={title} />
                <label htmlFor="subtitle-edit">Subtitle</label>
                <input onChange={updateData} type="text" name="subtitle-edit" id="subtitle-edit" defaultValue={subtitle} />
                <label htmlFor="pages-edit">Pages</label>
                <input onChange={updateData} type="text" name="pageCount-edit" id="pages-edit" defaultValue={pageCount} />
                <label htmlFor="published-edit">Date</label>
                <input onChange={updateData} type="text" name="publishedDate-edit" id="published-edit" defaultValue={publishedDate} />
                <label htmlFor="description-edit">Description</label>
                <input onChange={updateData} type="text" name="description-edit" id="description-edit" defaultValue={description} />
                <label htmlFor="price-edit">Price</label>
                <input onChange={updateData} type="text" name="amount-edit" id="price-edit" defaultValue={amount} />
                <div className="btn-container">
                    <button onClick={() => changeIsEditing('back')}>Back</button>
                    <button onClick={() => editBook(formData)}>Submit</button>
                </div>
            </div>
        </article>
    )
}