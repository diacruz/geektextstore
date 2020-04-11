import React, { useState, useReducer, useEffect, useContext } from 'react'
import BookCard from './BookCard'
import { useHistory } from 'react-router-dom'
import bookId from './BookCard'
import bookReducer from '../ShoppingCart/bookReducer'


const BookList = (props) => {
    let history = useHistory()

    const handleOpenDetails = (id) => () => history.push(`/${id}`)
    console.log(props)
 
    const handleAddToCart = (book) => () => {
        localStorage.setItem('books', JSON.stringify(book))
        console.log(book)
    }

    return (
        <div className="list">
            {props.books.books.map((book, i) => {
                if (book) {
                    console.log(book)

                    return (
                        <BookCard
                            openDetails={handleOpenDetails}
                            addToCart={handleAddToCart}
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
