// import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import { makeStyles, Typography } from '@material-ui/core'

// const useStyles = makeStyles(theme => ({
//     authorName: { color: '#666666' },
// }))

// const AuthorInfo = props => {
//     const classes = useStyles()
//     const { authors } = props

//     return (
//         <>
//             {authors.map((author, index) => {
//                 return (
//                     <Typography variant='h5' className={classes.authorName} key={index}>
//                         {author}
//                     </Typography>
//                 )
//             })}
//         </>
//     )
// }

// AuthorInfo.propTypes = {
//     authors: PropTypes.arrayOf(PropTypes.string),
// }

// export default AuthorInfo
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './AuthorInfo.css';

class AuthorInfo extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="authorInfoCont">
				<div className="heading">Author Details:</div>
				{this.props.authors.map(author => {
					let authInfo = author.bio ? author.bio : `No information available about ${author.name}.`;
					return (
						<div key={author.name}>
							<Link to={{ pathname: `/author-books/${author._id}`, state: { author } }} style={{ color: 'blue' }}>
								<div className="authorBioCont">- {author.name}</div>
							</Link>
							<div>{authInfo}</div>
						</div>
					);
				})}
			</div>
		);
	}
}

AuthorInfo.propTypes = {
	authors: PropTypes.arrayOf(PropTypes.object)
};

export default AuthorInfo;
