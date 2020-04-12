import React, { Component } from 'react'
import SearchArea from './SearchArea'
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

            filterfields: '',
            order: '',
            rating: '',
            bookspp: '',
        }
    }

    componentDidMount = () => {
        this.getBooks()
    }

    getBooks = () => {
        axios
            .get('/books')
            .then((x) => {
                this.setState({ books: x.data })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    rating = (e) => {
        this.setState({ rating: e.target.value })
    }

    bpp = (e) => {
        this.setState({ bookspp: e.target.value })
    }

    sortBooks = (e) => {
        this.setState({ sortfields: e.target.value })
    }

    filterBooks = (e) => {
        this.setState({ filterfields: e.target.value })
        console.log(this.state.filterfields)
    }

    changeAsc = (e) => {
        this.setState({ order: e.target.value })
    }

    render() {
        return (
            <div>
                <SortBar
                    sortBooks={this.sortBooks}
                    filterBooks={this.filterBooks}
                    changeAsc={this.changeAsc}
                    rating={this.rating}
                    bpp={this.bpp}
                />
                <BookList books={this.state} />
            </div>
        )
    }
}

export default Books
