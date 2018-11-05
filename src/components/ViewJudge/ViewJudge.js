import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";

import MyHeading from "../MyHeading/MyHeading";
import MySubHeading from "../MySubHeading/MySubHeading";

const styles = theme => ({
  myAvatar: {
    borderRadius: 10,
    color: "#fff",
    backgroundColor: theme.palette.primary.main,
  },
});

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

// const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  //   userSelect: "none",
  //   padding: grid * 2,
  //   margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  //   background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  //   background: isDraggingOver ? "lightblue" : "lightgrey",
  //   padding: grid,
  //   width: 250,
});

class ViewJudge extends Component {
  state = {
    results: [],
    items: [
      {
        lead: {
          username: "",
        },
        follow: {
          username: "",
        },
      },
    ],
  };

  componentDidMount() {
    axios({
      method: "GET",
      url: "/api/contest/couples/1",
    })
      .then(response => {
        console.log(response);

        this.setState({
          items: response.data,
        });
      })
      .catch(error => {
        alert("Something went wrong getting the couples from the server.");
        console.log(error);
      });
  }

  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  };

  handleSubmit = () => {
    axios({
      method: "POST",
      url: "/api/score",
      data: this.state.items,
    })
      .then(() => {
        alert("Rankings submitted successfully!");
      })
      .catch(error => {
        alert("Something went wrong submitting rankings.");
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <MyHeading>Place Dancers</MyHeading>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <List>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {this.state.items.map((item, index) => (
                    <Draggable
                      key={item.couple_id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <ListItem button>
                            <Avatar className={classes.myAvatar}>
                              {index + 1}
                              {/* <ImageIcon /> */}
                            </Avatar>
                            {/* <Avatar>
                              <ImageIcon />
                            </Avatar> */}
                            <ListItemText
                              primary={
                                item.lead.username +
                                "\n + " +
                                item.follow.username
                              }
                              // secondary={
                              //   item.lead.bib_number +
                              //   "\n + " +
                              //   item.follow.bib_number
                              // }
                            />
                          </ListItem>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </List>
        </DragDropContext>
        <Button onClick={this.handleSubmit}>Submit Rankings</Button>
      </div>
    );
  }
}

ViewJudge.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewJudge);
