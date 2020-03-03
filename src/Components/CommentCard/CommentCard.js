import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Rating from '../Rating'

const useStyles = makeStyles(theme => ({
    root: {
        width: 275,
        margin: theme.spacing(1),
    },
    pos: {
        marginBottom: 12,
    },
}))

const handleLike = () => {
    alert('I like this!')
}
export default function CommentCard(props) {
    const classes = useStyles()
    const { commentData } = props

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography
                    className={classes.title}
                    color="textSecondary"
                    variant="h5"
                    gutterBottom
                >
                    {commentData.owner}
                </Typography>
                <Rating value={commentData.rating}></Rating>
                <Typography variant="body2" component="p">
                    {commentData.text}
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
