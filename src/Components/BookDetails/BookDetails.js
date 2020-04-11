import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import AuthorInfo from '../AuthorInfo'
import { makeStyles } from '@material-ui/core/styles'
import CommentCard from '../CommentCard'
import axios from 'axios'
import { Typography, Paper } from '@material-ui/core'
import Image from 'material-ui-image'

const useStyles = makeStyles(theme => ({
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
}))

const commentDataMock = [
    {
        owner: 'Joan of Arc',
        commentId: '1678igjnu894u0',
        text: 'great book!',
        rating: 4,
    },
    {
        owner: 'Joan of Fire',
        commentId: '1678igjnu894u1',
        text: 'meh book!',
        rating: 3,
    },
    {
        owner: 'Joan of Water',
        commentId: '1678igjnu894u2',
        text: 'bad book!',
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

const BookDetails = props => {
    const classes = useStyles()
    const [bookInfo, setBookInfo] = useState()

    useEffect(() => {
        const volId = window.location.href.split('/')[4]
        axios
            .get(`https://www.googleapis.com/books/v1/volumes/${volId}`)
            .then(function(response) {
                // handle success
                setBookInfo(response)
            })
            .catch(function(error) {
                // handle error
                console.log(error)
            })
    }, [])

    console.log('cakish', bookInfo)

    return (
        <div className={classes.main}>
            {bookInfo && (
                <Typography className={classes.bookTitle} variant="h2">
                    {bookInfo.data.volumeInfo.title}
                </Typography>
            )}
            {bookInfo && (
                <AuthorInfo authors={bookInfo.data.volumeInfo.authors} />
            )}
            {bookInfo && (
                <Paper elevation={3} className={classes.cover}>
                    <Image
                        aspectRatio={200 / 300}
                        src={bookInfo.data.volumeInfo.imageLinks.thumbnail}
                    />
                </Paper>
            )}
            {commentDataMock.map(comment => (
                <CommentCard key={comment.commentId} commentData={comment} />
            ))}
        </div>
    )
}

BookDetails.propTypes = {
    book: PropTypes.object,
    match: PropTypes.object,
}

export default BookDetails
