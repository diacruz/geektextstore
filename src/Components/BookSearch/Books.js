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
            cartItems: [],
            searchField: '',
            sortfields: '',
        }
    }

    componentDidMount = () => {
        this.getBooks()
    }

    getBooks = () => {
        axios
            .get('/book')
            .then((response) => {
                this.setState({ books: response.data })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    sortBooks = (e) => {
        this.state.sortfields = e.target.value
    }

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
