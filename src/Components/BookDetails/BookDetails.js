import React, { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import AuthorInfo from '../AuthorInfo'
import Rating from '../Rating'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import ReviewCard from '../ReviewCard'
// import axios from 'axios'
import { Typography, Paper, Box, TextField, Button } from '@material-ui/core'
import { AppControlContext } from '../AppControlContext'
import { ReviewSignedAs } from '../../AppControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import Image from 'material-ui-image'

const useStyles = makeStyles((theme) => ({
    details: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    author: {
        display: 'flex',
        flexDirection: 'column',
    },
    bookTitle: { display: 'flex', flexDirection: 'column', color: '#666666' },
    cover: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        width: '200px',
        height: '300px',
    },
    reviewCard: {
        width: '100%',
        margin: theme.spacing(1),
        marginBottom: 50,
    },
    comment: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
        padding: theme.spacing(2),
    },
}))

const reviewsMock = [
    {
        ownerId: '1',
        owner: 'Joan of Arc',
        signedAs: ReviewSignedAs.fullname,
        comment: 'great book!',
        rating: 4,
    },
    {
        ownerId: '2',
        owner: 'Joan of Fire',
        signedAs: ReviewSignedAs.fullname,
        comment: 'meh book!',
        rating: 3,
    },
    {
        ownerId: '3',
        owner: 'Joan of Water',
        signedAs: ReviewSignedAs.fullname,
        comment: 'bad book!',
        rating: 1,
    },
]

// const getUserReview = (reviews, userId) => {
//     return reviews.find((review) => review.ownerId === userId)
// }

const BookDetails = (props) => {
    const { history } = props
    const { getCurrentUser, getBookById } = useContext(AppControlContext)
    const classes = useStyles()

    const [user, setUser] = useState(null)
    const [book, setBook] = useState(null)
    const [userPurchase, setUserPurchase] = useState(null)
    const [bookReviews, setBookReviews] = useState(reviewsMock)
    const [showReviewForm, setShowReviewForm] = useState(false)

    const [reviewComment, setReviewComment] = useState('')
    const [reviewSignAs, setReviewSignAs] = useState('')

    const [reviewRating, setReviewRating] = useState(0)

    useEffect(() => {
        // load the current user
        getCurrentUser()
            .then((u) => {
                console.log('getCurrentUser', u)
                setUser(u)
            })
            .catch((error) => {
                if (error.code === 'UserNotFound') {
                    history.push('/')
                }
            })

        // load the selected book details
        const volId = window.location.href.split('/')[4]
        console.log('volumeId', volId)
        getBookById(volId).then((b) => {
            console.log('getBookById', b)
            setBook(b)
        })

        // setBookInfo(getBookById(volId).then((res) => ({ ...res, ...reviews })))
        // console.log(bookInfo)
    }, [])

    useEffect(() => {
        if (!user || !book) return
        user.getPurchaseOfBook(book.id).then((up) => {
            console.log('user.getPurchaseOfBook', up)
            setUserPurchase(up)
            if (up.purchased && up.hasReview) {
                setBookReviews((prevList) => {
                    return [createDisplayedReview(up.review), ...prevList]
                })
            }
        })
    }, [user, book])

    const createDisplayedReview = (review) => {
        let owner = ''
        switch (review.signedAs) {
            case ReviewSignedAs.fullname:
                owner = user.name
                break
            case ReviewSignedAs.nickname:
                owner = user.nickname
                break
            default:
                owner = 'anonymous'
                break
        }
        return {
            ownerId: user.id,
            owner,
            signedAs: review.signedAs,
            comment: review.comment,
            rating: review.rating,
        }
    }

    const handleWriteReview = () => {
        setReviewSignAs(userPurchase.review.signedAs)
        setReviewComment(userPurchase.review.comment)
        setReviewRating(userPurchase.review.rating)
        setShowReviewForm(true)
    }

    const handleReviewCommentChange = (event) => {
        const comment = event.target.value
        setReviewComment(comment)
    }
    const handleReviewRatingChange = (event) => {
        const rating = event.target.value
        setReviewRating(rating)
    }
    const handleReviewSignAsChange = (event) => {
        const signedAs = event.target.value
        setReviewSignAs(signedAs)
    }
    const handleSubmit = () => {
        userPurchase.setReview(reviewSignAs, reviewComment, reviewRating)
        userPurchase.saveChanges().then((up) => {
            console.log('userPurchase.saveChanges', up)
            setUserPurchase(up)
            setBookReviews((prevList) => {
                return [
                    createDisplayedReview(up.review),
                    ...prevList.filter((x) => x.ownerId !== user.id),
                ]
            })
        })
        setShowReviewForm(false)
    }

    // console.log('bookInfo', gbooksData)

    if (!user || !book) {
        return <div>loading .......</div>
    }

    return (
        <div className={classes.main}>
            <Box>
                <Typography className={classes.bookTitle} variant="h2">
                    {book.title}
                </Typography>
                <AuthorInfo authors={book.authors} />
                <Paper elevation={3} className={classes.cover}>
                    <Image aspectRatio={200 / 300} src={book.thumbnail} />
                </Paper>
                {/* <Rating
                    value={gbooksData.data.volumeInfo.averageRating}
                    readOnly={true}
                /> */}
                {/* <Typography variant="caption">{`${gbooksData.data.volumeInfo.ratingsCount} ratings averaging ${gbooksData.data.volumeInfo.averageRating}`}</Typography> */}
            </Box>
            {userPurchase && userPurchase.purchased && !showReviewForm && (
                <Button
                    onClick={handleWriteReview}
                    variant="contained"
                    color="primary"
                >
                    {userPurchase.hasReview
                        ? 'Update your Review'
                        : 'Write A Review'}
                </Button>
            )}
            {showReviewForm && (
                <Card className={classes.reviewCard}>
                    <CardContent>
                        <Box style={{ display: 'flex', marginBottom: 16 }}>
                            <Typography style={{ alignSelf: 'center' }}>
                                Posting as: &nbsp;
                            </Typography>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={reviewSignAs}
                                onChange={handleReviewSignAsChange}
                            >
                                <MenuItem value={ReviewSignedAs.fullname}>
                                    Fullname
                                </MenuItem>
                                <MenuItem value={ReviewSignedAs.nickname}>
                                    Nickname
                                </MenuItem>
                                <MenuItem value={ReviewSignedAs.anonymous}>
                                    Anonymous
                                </MenuItem>
                            </Select>
                        </Box>

                        <TextField
                            className={classes.comment}
                            fullWidth
                            label="Write A Review"
                            value={reviewComment}
                            onChange={handleReviewCommentChange}
                        />
                        <Rating
                            value={reviewRating}
                            onChange={handleReviewRatingChange}
                        ></Rating>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            size="small"
                        >
                            Submit!
                        </Button>
                    </CardActions>
                </Card>
            )}
            {bookReviews.map((review) => (
                <ReviewCard key={review.ownerId} reviewData={review} />
            ))}
        </div>
    )
}

BookDetails.propTypes = {
    book: PropTypes.object,
    match: PropTypes.object,
}

export default BookDetails
