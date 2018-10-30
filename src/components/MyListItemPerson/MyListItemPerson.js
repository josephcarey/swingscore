import React from "react";

import { Avatar, ListItem, ListItemText } from "@material-ui/core";

import ImageIcon from "@material-ui/icons/Image";

const MyListItemPerson = props => {
  return (
    <div>
      <ListItem button onClick={() => props.handleClick(props.item)}>
        <Avatar>
          <ImageIcon />
        </Avatar>
        <ListItemText
          primary={props.item.username}
          secondary={props.item.bib_number}
        />
      </ListItem>
    </div>
  );
};

export default MyListItemPerson;
