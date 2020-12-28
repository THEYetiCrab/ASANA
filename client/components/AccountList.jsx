import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';




// const AccountList = () => {
//   return (
//     <div className = "accountList">
//       <h3>Current accounts</h3>
//         <Account />
//     </div>
//   )
// };

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function SimpleList() {
  const classes = useStyles();

  return (
    
    <div className={classes.root}>
      <List component="nav">
        <ListItem button>
          <ListItemText primary="Account1" />
        </ListItem>
      <Divider />
        <ListItem button>
          <ListItemText primary="Account2" />
        </ListItem>
      <Divider />
        <ListItem button>
          <ListItemText primary="Account3" />
        </ListItem>
      <Divider />  
        <ListItemLink>
          <ListItemText primary="Account4" />
        </ListItemLink>
      </List>
    </div>
  );
}