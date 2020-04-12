import React, { useContext } from 'react'
import { AppControlContext } from '../AppControlContext'

function Navbar() {
    const AppControl = useContext(AppControlContext)

    return (
        <header>
            <nav>
                <h2>Geek Text</h2>
                <ul>
                    <li>
                        <a href="/home">Home</a>
                    </li>

                    <li>
                        <a href="/search">Search</a>
                    </li>

                    <li>
                        <a href="/wishlist">Wishlist</a>
                    </li>

                    <li>
                        <a href="/cart">Cart</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar
