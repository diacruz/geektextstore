import React, { Component } from 'react'
import WishlistContainer from './WishlistContainer';


class Wishlist extends Component {
    render() {
        return (
            <div>
				<h1>Welcome to the Wishlist Page:</h1>
                <h3>Please select the button below to create a list</h3>              

				<WishlistContainer />
            </div>
        )
    }
}

export default Wishlist