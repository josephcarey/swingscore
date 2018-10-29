import React, { Component } from "react";

import { Avatar, ListItem, ListItemText } from "@material-ui/core";

import ImageIcon from "@material-ui/icons/Image";

const MyListItem = props => {
  return (
    <div>
      <ListItem button onClick={() => props.handleClick(props.item)}>
        <Avatar>
          <ImageIcon />
        </Avatar>
        <ListItemText
          primary={props.item.name}
          secondary="Cool text could go here"
        />
      </ListItem>
    </div>
  );
};

export default MyListItem;
