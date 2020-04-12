import React, { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import AuthorInfo from '../AuthorInfo'
import Rating from '../Rating'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import ReviewCard from '../ReviewCard'
import axios from 'axios'
import { Typography, Paper, Box, TextField, Button } from '@material-ui/core'
import { AppControlContext } from '../AppControlContext'
import { ReviewSignedAs } from '../../AppControl'

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

const bookExample = {
    kind: 'books#volume',
    id: 'zVxLJvTEctcC',
    etag: 'yCMyZspHT+Q',
    selfLink: 'https://www.googleapis.com/books/v1/volumes/zVxLJvTEctcC',
    volumeInfo: {
        title: 'The Book of Mormon',
        subtitle:
            'An Account Written by the Hand of Mormon, Upon Plates Taken from the Plates of Nephi',
        publisher: 'Deseret News',
        publishedDate: '1907',
        readingModes: { text: false, image: true },
        pageCount: 623,
        printedPageCount: 1300,
        dimensions: { height: '17.00 cm' },
        printType: 'BOOK',
        maturityRating: 'NOT_MATURE',
        allowAnonLogging: false,
        contentVersion: '0.1.1.0.full.1',
        panelizationSummary: {
            containsEpubBubbles: false,
            containsImageBubbles: false,
        },
        imageLinks: {
            smallThumbnail:
                'http://books.google.com/books/content?id=zVxLJvTEA4t-9X36W5enKgSMx-KKlEpkxUTOQ972FA&source=gbs_api',
            thumbnail:
                'http://books.google.com/books/content?id=FqSiDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
            small:
                'http://books.google.com/books/content?id=zVxLJvTEc…fAwfoO8wJwyVxLFDPHUHHYdDf3jTHIiTGj&source=gbs_api',
            medium:
                'http://books.google.com/books/content?id=zVxLJvTEc…FaGwKudwwJH__ffuTFkl7hwCMghBBaH7Cy&source=gbs_api',
            large:
                'http://books.google.com/books/content?id=zVxLJvTEc…E4OYlDbhKUVUNR60GOKDjAWJXOj74M0SLi&source=gbs_api',
        },
        language: 'en',
        previewLink:
            'http://books.google.com/books?id=zVxLJvTEctcC&hl=&source=gbs_api',
        infoLink:
            'https://play.google.com/store/books/details?id=zVxLJvTEctcC&source=gbs_api',
        canonicalVolumeLink:
            'https://play.google.com/store/books/details?id=zVxLJvTEctcC',
    },
}

const getUserReview = (reviews, userId) => {
    return reviews.find((review) => review.ownerId === userId)
}

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
            if (up.purchased) {
                setBookReviews((prevList) => {
                    return [ 
                        createDisplayedReview(up.review),
                        ...prevList
                    ]
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
    const handleSubmit = () => {
        userPurchase.setReview('', reviewComment, reviewRating)
        userPurchase.saveChanges().then((up) => {
            console.log('userPurchase.saveChanges', up)
            setUserPurchase(up)
            setBookReviews((prevList) => {
                return [ 
                    createDisplayedReview(up.review),
                    ...prevList.filter((x) => x.ownerId !== user.id)
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
                        <Button onClick={handleSubmit} size="small">
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
