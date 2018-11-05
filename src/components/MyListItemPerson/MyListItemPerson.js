import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { Avatar, ListItem, ListItemText } from "@material-ui/core";

import ImageIcon from "@material-ui/icons/Image";

const styles = theme => ({
  myAvatar: {
    color: "#fff",
    backgroundColor: theme.palette.primary.main,
  },
});

const MyListItemPerson = props => {
  const { classes } = props;
  return (
    <div>
      <ListItem button onClick={() => props.handleClick(props.item)}>
        <Avatar className={classes.myAvatar}>
          {props.item.bib_number}
          {/* <ImageIcon /> */}
        </Avatar>
        <ListItemText
          primary={props.item.username}
          // secondary={props.item.bib_number}
        />
      </ListItem>
    </div>
  );
};

MyListItemPerson.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyListItemPerson);
