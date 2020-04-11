import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const Cart = (props) => {
    const localData = localStorage.getItem('books')
    const handleRemoveFromCart = () => {
        localStorage.removeItem('books')
        localStorage.getItem('books')
    }

    return (
        <div className="list">
            {localData}
            <br />
            <div>
                <Button
                    size="small"
                    onClick={handleRemoveFromCart}
                    variant="outlined"
                    color="primary"
                >
                    Remove from Cart
                </Button>
            </div>
        </div>
    )
}

export default Cart
