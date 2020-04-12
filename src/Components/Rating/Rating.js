import React from 'react'
import RatingMUI from '@material-ui/lab/Rating'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        '& > * + *': {
            marginTop: theme.spacing(1),
        },
    },
}))

export default function Rating(props) {
    const { value, readOnly, onChange } = props
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <RatingMUI name="read-only" value={value} readOnly={readOnly} onChange={onChange} />
        </div>
    )
}
