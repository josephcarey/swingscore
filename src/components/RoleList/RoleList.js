import React from "react";
import { List } from "@material-ui/core";
import RoleListItem from "../RoleListItem/RoleListItem";

const RoleList = props => {
  return (
    <>
      <List dense>
        {props.people.map(person => {
          return (
            <RoleListItem
              key={person.id}
              person={person}
              handleToggle={props.handleToggle}
            />
          );
        })}
      </List>
    </>
  );
};

export default RoleList;
