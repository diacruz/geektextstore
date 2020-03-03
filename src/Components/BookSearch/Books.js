import React, { Component } from 'react'
import SearchArea from './SearchArea'
import request from 'superagent'
import BookList from './BookList'

class Books extends Component {
    constructor(props) {
        super(props)
        this.state = {
            books: [],
            searchField: '',
        }
    }

    searchBook = e => {
        e.preventDefault()
        request
            .get('https://www.googleapis.com/books/v1/volumes')
            .query({ q: this.state.searchField })
            .then(data => {
                console.log(data)
                const cleanData = this.cleanData(data)
                this.setState({ books: cleanData })
            })
    }

    handleSearch = e => {
        console.log(e.target.values)
        this.setState({ searchField: e.target.value })
    }

    cleanData = data => {
        const cleanedData = data.body.items.map(book => {
            if (book.volumeInfo.hasOwnProperty('publishedDate') === false) {
                book.volumeInfo['publishedDate'] = '0000'
            } else if (
                book.volumeInfo.hasOwnProperty('imageLinks') === undefined
            ) {
                book.volumeInfo['imageLinks'] = {
                    thumbnail:
                        'https://edgeenvironment.com/wp-content/uploads/2016/05/no-image-available.jpg',
                }
            } else if (book.volumeInfo.hasOwnProperty('imageLinks') === false) {
                book.volumeInfo['imageLinks'] = {
                    thumbnail:
                        'https://edgeenvironment.com/wp-content/uploads/2016/05/no-image-available.jpg',
                }
            }

            //else if(book.saleInfo.retailPrice.hasOwnProperty('amount') === false){
            //    book.saleInfo.retailPrice['amount'] = '0.00';
            //}

            return book
        })
        return cleanedData
    }

    render() {
        return (
            <div>
                <SearchArea
                    searchBook={this.searchBook}
                    handleSearch={this.handleSearch}
                />
                <BookList books={this.state.books} />
            </div>
        )
    }
}

export default Books
