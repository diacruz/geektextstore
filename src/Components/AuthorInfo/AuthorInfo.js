import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    authorName: { color: '#666666' },
}))

const AuthorInfo = props => {
    const classes = useStyles()
    const { authors } = props

    return (
        <>
            {authors.map((author, index) => {
                return (
                    <Typography variant='h5' className={classes.authorName} key={index}>
                        {author}
                    </Typography>
                )
            })}
        </>
    )
}

AuthorInfo.propTypes = {
    authors: PropTypes.arrayOf(PropTypes.string),
}

export default AuthorInfo
