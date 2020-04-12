import React, { Component } from 'react'
import SearchArea from './SearchArea'
import request from 'superagent'
import BookList from './BookList'
import SortBar from './SortBar'
import axios from 'axios'

class Books extends Component {
    constructor(props) {
        super(props)
        this.state = {
            books: [],
            searchField: '',
            sortfields: ''
        }
    }

    componentDidMount = () => {
        this.getBooks();
    }

    getBooks = () => {
        axios.get('/books')
            .then((x) => {
                this.setState({books: x.data})
            })
            .catch((err) => {
                console.log(err);
            });
    }

    sortBooks = e => {
      this.state.sortfields = e.target.value;
    }

  //searchBook = e => {
  //    e.preventDefault()
  //    request
  //        .get('https://www.googleapis.com/books/v1/volumes')
  //        .query({ q: this.state.searchField })
  //        .then(data => {
  //            console.log(data)
  //            const cleanData = this.cleanData(data)
  //            this.setState({ books: cleanData })
  //        })
  //}

  //handleSearch = e => {
  //    console.log(e.target.values)
  //    this.setState({ searchField: e.target.value })
  //}

    //cleanData = data => {
    //    const cleanedData = data.body.items.map(book => {
    //        if (book.volumeInfo.hasOwnProperty('publishedDate') === false) {
    //            book.volumeInfo['publishedDate'] = '0000'
    //        } else if (
    //            book.volumeInfo.hasOwnProperty('imageLinks') === undefined
    //        ) {
    //            book.volumeInfo['imageLinks'] = {
    //                thumbnail:
    //                    'https://edgeenvironment.com/wp-content/uploads/2016/05/no-image-available.jpg',
    //            }
    //        } else if (book.volumeInfo.hasOwnProperty('imageLinks') === false) {
    //            book.volumeInfo['imageLinks'] = {
    //                thumbnail:
    //                    'https://edgeenvironment.com/wp-content/uploads/2016/05/no-image-available.jpg',
    //            }
    //        }
//
    //        return book
    //    })
    //    return cleanedData
    //}

    render() {
        return (
            <div>
                <SortBar sortBooks={this.sortBooks} />
                <BookList books={this.state} />
            </div>
        )
    }
}

export default Books