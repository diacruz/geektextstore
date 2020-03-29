import React from 'react';
//for stylizing of page
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import { palette } from '@material-ui/system';



const useStyles = 
	makeStyles
	(
		{
			root: 
			{
				minWidth: 1,
			},
			
			bullet: 
			{
				display:   "inline-block",
				margin:    "0 2px",
				transform: "scale(0.8)"
			},
			title: 
			{
				fontSize: 15
			},
			pos: 
			{
				marginBottom: 12
			}
		}
	);
	
let id = 0;




const Wishlist1 = 
[
	{
		id: '1a',
		firstNameAuthor: 'Robin',
		lastNameAuthor: 'Wieruch',
		bookTitle: 'Example Book 1',
		year: 1988,
		price: 14.00,
	},
	{
		id: '1b',
		firstNameAuthor: 'Dave',
		lastNameAuthor: 'Davidds',
		bookTitle: 'Example Book 2',
		year: 1990,
		price: 14.50,
	},
	{
		id: '1c',
		firstNameAuthor: 'Sam',
		lastNameAuthor: 'Cushnerson',
		bookTitle: 'Example Book 3',
		year: 2001,
		price: 16.00,
	},
	{
		id: '1d',
		firstNameAuthor: 'Ray',
		lastNameAuthor: 'Kurzweil',
		bookTitle: 'Example Book 4',
		year: 2006,
		price: 15.19,
	},
];
const Wishlist2 = 
[
	{
		id: '2a',
		firstNameAuthor: 'Robin',
		lastNameAuthor: 'Wieruch',
		bookTitle: 'Example Book 1',
		year: 1988,
		price: 14.00,
	},
	{
		id: '2b',
		firstNameAuthor: 'Dave',
		lastNameAuthor: 'Davidds',
		bookTitle: 'Example Book 2',
		year: 1990,
		price: 14.50,
	},
	{
		id: '2c',
		firstNameAuthor: 'Sam',
		lastNameAuthor: 'Cushnerson',
		bookTitle: 'Example Book 3',
		year: 2001,
		price: 16.00,
	},
	{
		id: '2d',
		firstNameAuthor: 'Ray',
		lastNameAuthor: 'Kurzweil',
		bookTitle: 'Example Book 4',
		year: 2006,
		price: 15.19,
	},
];
const Wishlist3 = 
[
	{
		id: '3a',
		firstNameAuthor: 'Robin',
		lastNameAuthor: 'Wieruch',
		bookTitle: 'Example Book 1',
		year: 1988,
		price: 14.00,
	},
	{
		id: '3b',
		firstNameAuthor: 'Dave',
		lastNameAuthor: 'Davidds',
		bookTitle: 'Example Book 2',
		year: 1990,
		price: 14.50,
	},
	{
		id: '3c',
		firstNameAuthor: 'Sam',
		lastNameAuthor: 'Cushnerson',
		bookTitle: 'Example Book 3',
		year: 2001,
		price: 16.00,
	},
	{
		id: '3d',
		firstNameAuthor: 'Ray',
		lastNameAuthor: 'Kurzweil',
		bookTitle: 'Example Book 4',
		year: 2006,
		price: 15.19,
	},
];

const WishlistContainer = [Wishlist1, Wishlist2, Wishlist3];

const NestedList = () => 
(
  <ul>
    {WishlistContainer.map((nestedList, index) => 
	(
      <ul key = {index}>
        <h4 align = "left">
			Wishlist # {index + 1}
		</h4>
		
        {nestedList.map(item => 
		(
			<li key={item.id}>
				<Grid
					container
					direction="row"
					justify="flex-start"
					alignItems="flex-start"
					>


				<Box color="text.primary" bgcolor="primary.main">
				<div align = "left"> 
					{item.bookTitle} by {item.firstNameAuthor} {item.lastNameAuthor}, {item.year} : {item.price.toFixed(2)} 
					
					<Button variant="contained" size="small" color="primary" >
						Remove
					</Button>
					
					<Button variant="contained" size="small" color="primary" >
						Move to other list
					</Button>
					
					<Button variant="contained" size="small" color="primary" >
						Add to Cart
					</Button>
				
					
				</div>
				</Box>
				</Grid>
				
			</li>
        ))}
		<br></br>
      </ul>
    ))}
  </ul>
);

export default NestedList;