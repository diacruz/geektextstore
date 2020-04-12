import React from 'react';
//for stylizing of page
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
//checklist transfer feature
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { display } from '@material-ui/system';
//icons for buttons
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Hidden } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
	root: {
	  margin: 'auto',
	},
	paper: {
	  width: 550,
	  height: 'auto',
	  overflow: 'auto',
	},
	button: {
	  margin: theme.spacing(0.1, 0),
	},
  }));

function not(a, b) 
{
	return a.filter(value => b.indexOf(value) === -1);
}

  function intersection(a, b) 
{
	return a.filter(value => b.indexOf(value) !== -1);
}

const wishlist1Name = 'Wishlist 1';
const wishlist2Name = 'Wishlist 2';
const wishlist3Name = 'Wishlist 3';


const exampleList1 = 
[
	{ id: '0', firstNameAuthor: 'Robin', lastNameAuthor: 'Wieruch',    bookTitle: 'Example Book 1', year: 1988, price: 14.00, wishlistName: wishlist1Name},
	{ id: '1', firstNameAuthor: 'Dave',	 lastNameAuthor: 'Davidds',	   bookTitle: 'Example Book 2', year: 1990, price: 14.50, wishlistName: wishlist1Name},
	{ id: '2', firstNameAuthor: 'Sam',	 lastNameAuthor: 'Cushnerson', bookTitle: 'Example Book 3', year: 2001, price: 16.00, wishlistName: wishlist1Name},
	{ id: '3', firstNameAuthor: 'Ray',	 lastNameAuthor: 'Kurzweil',   bookTitle: 'Example Book 4', year: 2006, price: 15.19, wishlistName: wishlist1Name},
];
const exampleList2 = 
[
	{ id: '4', firstNameAuthor: 'Robin', lastNameAuthor: 'Wieruch',    bookTitle: 'Example Book 1', year: 1988, price: 14.00, wishlistName: wishlist2Name},
	{ id: '5', firstNameAuthor: 'Dave',	 lastNameAuthor: 'Davidds',	   bookTitle: 'Example Book 2', year: 1990, price: 14.50, wishlistName: wishlist2Name},
	{ id: '6', firstNameAuthor: 'Sam',	 lastNameAuthor: 'Cushnerson', bookTitle: 'Example Book 3', year: 2001, price: 16.00, wishlistName: wishlist2Name},
	{ id: '7', firstNameAuthor: 'Ray',	 lastNameAuthor: 'Kurzweil',   bookTitle: 'Example Book 4', year: 2006, price: 15.19, wishlistName: wishlist2Name},
];
const exampleList3 = 
[
	{ id: '8', firstNameAuthor: 'Robin', lastNameAuthor: 'Wieruch',    bookTitle: 'Example Book 1', year: 1988, price: 14.00, wishlistName: wishlist3Name},
	{ id: '9', firstNameAuthor: 'Dave',	 lastNameAuthor: 'Davidds',	   bookTitle: 'Example Book 2', year: 1990, price: 14.50, wishlistName: wishlist3Name},
	{ id: '10', firstNameAuthor: 'Sam',	 lastNameAuthor: 'Cushnerson', bookTitle: 'Example Book 3', year: 2001, price: 16.00, wishlistName: wishlist3Name},
	{ id: '11', firstNameAuthor: 'Ray',	 lastNameAuthor: 'Kurzweil',   bookTitle: 'Example Book 4', year: 2006, price: 15.19, wishlistName: wishlist3Name},
];

function TransferList()
{
	var button = document.getElementsByClassName("MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-containedSizeSmall MuiButton-sizeSmall");
	var text = document.getElementsByClassName("MuiBox-root MuiBox-root-178");
	const classes = useStyles();

	const [checked, setChecked] = React.useState([]);

	const [leftList,   setLeft  ] = React.useState(exampleList1);
	const [centerList, setCenter] = React.useState(exampleList2);
	const [rightList,  setRight ] = React.useState(exampleList3);
  
	const leftChecked   = intersection(checked, leftList);
	const centerChecked = intersection(checked, centerList);
	const rightChecked  = intersection(checked, rightList);

	const handleDelete = id =>
	{
		setLeft(leftList.filter(value => value.id !== id));
		setCenter(centerList.filter(value=> value.id !==id));
		setRight(rightList.filter(value=> value.id !==id));
	}


	const handleToggleVisibilityy = () => 
	{
	
		if (document.getElementById("thisistext").hidden == false)
		{
			document.getElementById("thisistext").hidden = true;
		}
		else
		{
			document.getElementById("thisistext").hidden = false;
		}				
	}


	const handleToggle = value => () => 
	{
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];
  
		if (currentIndex === -1) 
		{
			newChecked.push(value);
		} 
		else 
		{
			newChecked.splice(currentIndex, 1);
		}
	
		setChecked(newChecked);
	};

	const handleCheckedLeftToCenter = () => 
	{
		//add new item to center
		setCenter(centerList.concat(leftChecked));
		//remove item from old list
		setLeft(not(leftList, leftChecked));
		//uncheck the transferred item
		setChecked(not(checked, leftChecked));
	};

	const handleCheckedCenterToLeft = () => 
	{
		setLeft(leftList.concat(centerChecked));
		setCenter(not(centerList, centerChecked));
		setChecked(not(checked, centerChecked));
	};

	const handleCheckedCenterToRight = () => 
	{
	  setRight(rightList.concat(centerChecked));
	  setCenter(not(centerList, centerChecked));
	  setChecked(not(checked, centerChecked));
	};

	const handleCheckedRightToCenter = () => 
	{
		setCenter(centerList.concat(rightChecked));
		setRight(not(rightList, rightChecked));
		setChecked(not(checked, rightChecked));
	};	

	const customList = items => (
		<Paper className={classes.paper}>
			<List dense component="div" role="list">
				{items.map(value => 
				{
					return (
						<ListItem key={value.id} role="listitem" button onClick={handleToggle(value)}>
							<ListItemIcon>
								<Checkbox
									checked={checked.indexOf(value) !== -1}
									tabIndex={-1}
									disableRipple									
								/>
							</ListItemIcon>
							
							<label>{value.bookTitle} by {value.firstNameAuthor} {value.lastNameAuthor} ({value.year}) </label>
							
							<ListItemSecondaryAction>             					
								  	<Button edge="end" variant="contained" size="small" color="secondary" onClick={() => handleDelete(value.id)}>
										<DeleteForeverIcon/>
									</Button>

									<Button edge="end" variant="contained" size="small" color="primary" onClick={() =>handleDelete(value.id) }>
										<AddShoppingCartIcon/>
									</Button>             					
            				</ListItemSecondaryAction>
							
						</ListItem>
					);
				})}
		  		<ListItem/>
			</List>
	  </Paper>
	);
  
	return (
		<div>
			<Grid container spacing={10}>
				
				<Grid item xs>
					<Box className="ToggleVisibleButton" name="addbutton">
						<Paper id="letsee" hidden={true}>								
							<Button variant="contained" size="small" color="primary" onClick={() =>handleToggleVisibilityy()}>
								<AddBoxIcon/>
							</Button> 
						</Paper>
					</Box>

					<Box id="thisistext"name="titletext"hidden={false}>
						<Paper >
							<h2 >{wishlist1Name}</h2>
						</Paper>
					</Box>
				</Grid>
		
				<Grid item xs>
					<Box id="thisistext"name="titletext"hidden={false}>
						<Paper className={classes.paper}>
							<h2>{wishlist2Name}</h2>
						</Paper>
					</Box>
				</Grid>

				<Grid item xs>
					<Box id="thisistext"name="titletext"hidden={false}></Box>
					<Paper className={classes.paper}>
						<h2>{wishlist3Name}</h2>
					</Paper>
				</Grid>
			</Grid>

			<Grid container spacing={3}>
				<Grid item xs>
					<Paper className={classes.paper}>
						{customList(leftList)}
					</Paper>
				</Grid>

				<Grid item>
					<Grid container direction="column" alignItems="center">

						<Button
						variant="outlined"
						size="small"
						className={classes.button}
						onClick={handleCheckedLeftToCenter}
						disabled={leftChecked.length === 0}
						aria-label="move selected right"
						>
							&gt;
						</Button>

						<Button
						variant="outlined"
						size="small"
						className={classes.button}
						onClick={handleCheckedCenterToLeft}
						disabled={centerChecked.length === 0}
						aria-label="move selected left"
						>
							&lt;
						</Button>
					</Grid>
				</Grid>

				<Grid item xs>
					<Paper className={classes.paper}>
						{customList(centerList)}
					</Paper>
				</Grid>

				<Grid item>
					<Grid container direction="column" alignItems="center">

						<Button
						variant="outlined"
						size="small"
						className={classes.button}
						onClick={handleCheckedCenterToRight}
						disabled={centerChecked.length === 0}
						aria-label="move selected right"
						>
							&gt;
						</Button>

						<Button
						variant="outlined"
						size="small"
						className={classes.button}
						onClick={handleCheckedRightToCenter}
						disabled={rightChecked.length === 0}
						aria-label="move selected left"
						>
							&lt;
						</Button>
					</Grid>
				</Grid>

				<Grid item xs>
					<Paper className={classes.paper}>
						{customList(rightList)}
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}

const NestedList = () => 
(
  <ul>
	{TransferList()}
  </ul>
);

export default NestedList;