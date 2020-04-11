import React from 'react'
import BookCard from './BookCard'
import { useHistory } from 'react-router-dom'

const BookList = props => {
    let history = useHistory()

    const handleOpenDetails = id => () => history.push(`/book-details/${id}`)

    var sortedBooks = props.books.books;

    var sorttitleasc = function (a, b) {
        a = a.title.toLowerCase();
        b = b.title.toLowerCase();
        if (a < b) return 1;
        if (a > b) return -1;
        return 0;
    }

    var sorttitledes = function (a, b) {
        a = a.title.toLowerCase();
        b = b.title.toLowerCase();
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }

    var sortauthorasc = function (a, b) {
        a = a.authors[0].toLowerCase();
        b = b.authors[0].toLowerCase();
        if (a < b) return 1;
        if (a > b) return -1;
        return 0;
    }

    var sortauthordes = function (a, b) {
        a = a.authors[0].toLowerCase();
        b = b.authors[0].toLowerCase();
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }

    var sortdateasc = function (a, b) {
        a = (a.publishedDate + "").substring(0, 10);
        b = (b.publishedDate + "").substring(0, 10);
        if (a == "undefined")
        {
            a = ''
        }
        if (a < b) return 1;
        if (a > b) return -1;
        return 0;
    }

    var sortdatedes = function (a, b) {
        a = (a.publishedDate + "").substring(0, 10);
        b = (b.publishedDate + "").substring(0, 10);
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }

    if (props.books.sortfields == "title")
    {
        if (props.books.order == "des") {
            sortedBooks = sortedBooks.sort(sorttitledes);
        } else {
            sortedBooks = sortedBooks.sort(sorttitleasc)
        }
    }
    else if (props.books.sortfields == "author")
    {
        if (props.books.order == "des") {
            sortedBooks = sortedBooks.sort(sortauthordes);
        } else {
            sortedBooks = sortedBooks.sort(sortauthorasc)
        }
    }
    else if (props.books.sortfields == "published-date")
    {
        if (props.books.order == "des") {
            sortedBooks = sortedBooks.sort(sortdatedes);
        } else {
            sortedBooks = sortedBooks.sort(sortdateasc)
        }
    }


    return (
        <div className="list">
            {
                sortedBooks.map((book, i) => {
                    if (book) {
                        var date = book.publishedDate + "";
                        date = date.substring(0, 10);

                        if (props.books.filterfields != "" && props.books.filterfields != "null")
                        {
                            console.log(props.books.filterfields + " " + book.categories);

                            if (book.categories[0] == props.books.filterfields || book.categories[1] == props.books.filterfields)
                            {
                                return (
                                    <BookCard
                                        openDetails={handleOpenDetails}
                                        key={i}
                                        image={book.thumbnailUrl}
                                        title={book.title}
                                        author={book.authors[0]}
                                        published={date}
                                        bookId={book._id}
                                    />
                                )
                            }
                        } 
                        else
                        {
                            return (
                                <BookCard
                                    openDetails={handleOpenDetails}
                                    key={i}
                                    image={book.thumbnailUrl}
                                    title={book.title}
                                    author={book.authors[0]}
                                    published={date}
                                    bookId={book._id}
                                />
                            )
                        }                   
                    }
                    return undefined
            })}
        </div>
    )
}

export default BookList
