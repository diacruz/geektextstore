import React, { useState, Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import BookDetails from './Components/BookDetails/BookDetails'
import Navbar from './Components/NavigationBar/Navbar'
import Books from './Components/BookSearch/Books'
import Cart from './Components/ShoppingCart/Cart'
import Home from './Components/Home'
import Wishlist from './Components/WishListManagement/Wishlist'
import { AppControlProvider } from './Components/AppControlContext'

function App() {
    return (
        <AppControlProvider>
            <BrowserRouter>
                <div className="App">
                    <Navbar />
                    <Switch>
                        <Route path="/" component={Home} exact />
                        <Route path="/home" component={Home} exact />
                        <Route path="/search" component={Books} exact />
                        <Route path="/wishlist" component={Wishlist} exact />
                        <Route path="/cart" component={Cart} exact />
                        <Route
                            path="/book-details/:id"
                            component={BookDetails}
                        />
                    </Switch>
                </div>
            </BrowserRouter>
        </AppControlProvider>
    )
}

export default App
