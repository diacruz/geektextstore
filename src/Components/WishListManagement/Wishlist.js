import React, { Component } from 'react'

class Wishlist extends Component {
    render() {
        return (
            <div className="wishlist">
                <div className="wishlist-img">
                    <img className="wishlist-image"
                        src="https://cdn4.iconfinder.com/data/icons/e-commerce-ui-outline/64/ecommerce_-_love_favorite-512.png"
                        alt="WishList"
                    />
                </div>
                <h1>Wish List.</h1>
            </div>
        )
    }
}

export default Wishlist