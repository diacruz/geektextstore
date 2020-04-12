import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Books from './Books'
import { bookReducer } from '../ShoppingCart/bookReducer'
import { CardContent, CardActions, Card } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    btn: {
        margin: theme.spacing(1),
    },
    cardContainer: {
        margin: theme.spacing(2),
        maxWidth: 270,
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'space-between',
    },
    cardActions: {
        bottom: 0,
    },
}))

const BookCard = (props) => {
    const {
        openDetails,
        addToCart,
        image,
        title,
        author,
        published,
        bookId,
        price,
        dummyrating,
    } = props

    const classes = useStyles()

    return (
        <Card className={classes.cardContainer}>
            <CardContent>
                <img src={image} alt="" />
                <div className="desc">
                    <h2>{title}</h2>
                    <h3>{author}</h3>
                    <p>{published}</p>
                    <p>Price: {price}</p>
                    <p>Rating: {dummyrating}</p>
                </div>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button
                    size="small"
                    className={classes.btn}
                    onClick={openDetails(bookId)}
                    variant="outlined"
                    color="primary"
                >
                    Book Details
                </Button>
                <Button
                    size="small"
                    className={classes.btn}
                    onClick={addToCart([
                        props.title,
                        props.author,
                        props.price,
                    ])}
                    variant="outlined"
                    color="primary"
                >
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
    )
}

export default BookCard
