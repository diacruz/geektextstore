import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Rating from '../Rating'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: theme.spacing(1),
    },
    pos: {
        marginBottom: 12,
    },
    commentText: {
        textAlign: 'left',
        margin: theme.spacing(1),
    },
}))

const handleLike = () => {
    alert('I like this!')
}
export default function ReviewCard(props) {
    const classes = useStyles()
    const { reviewData } = props

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography
                    className={classes.commentText}
                    color="textSecondary"
                    variant="h6"
                    gutterBottom
                >
                    {reviewData.owner}
                </Typography>
                <Rating value={reviewData.rating}></Rating>
                <Typography
                    className={classes.commentText}
                    variant="body2"
                    component="p"
                >
                    {reviewData.comment}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={handleLike} size="small">
                    Like!
                </Button>
            </CardActions>
        </Card>
    )
}
