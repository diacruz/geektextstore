import React from 'react'
import BookCard from './BookCard'
import { useHistory } from 'react-router-dom'

const BookList = props => {
    let history = useHistory()

    const handleOpenDetails = id => () => history.push(`/book-details/${id}`)
    
    return (
        <div className="list">
            {props.books.map((book, i) => {
                if (book) {
                    console.log(book)

                    return (
                        <BookCard
                            openDetails={handleOpenDetails}
                            key={i}
                            image={book.thumbnailUrl}
                            title={book.title}
                            author={book.authors[0]}
                            published={book.publishedDate}
                            bookId={book._id}
                        />
                    )
                }
                return undefined
            })}
        </div>
    )
}

export default BookList
