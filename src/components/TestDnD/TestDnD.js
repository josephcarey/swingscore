import React, { Component } from "react";
import axios from "axios";
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

import NavbarSpacer from "../NavbarSpacer/NavbarSpacer";

// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `cool thing ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

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

class TestDnD extends Component {
  state = {
    items: [
      { id: 1, content: "Jeb and Anna" },
      { id: 2, content: "Anne and Svetlana" },
      { id: 3, content: "Ben and Beth" },
      { id: 4, content: "Bob and Rob" },
    ],
  };

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
    return (
      <div>
        <NavbarSpacer />
        <Typography variant="h5">Place Dancers</Typography>
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
                      key={item.id}
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
                            <Avatar>
                              <ImageIcon />
                            </Avatar>
                            <Avatar>
                              <ImageIcon />
                            </Avatar>
                            <ListItemText
                              primary={item.content}
                              secondary="Cool text could go here"
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
        <Button onClick={this.handleFinalize}>Finalize Results</Button>
      </div>
    );
  }
}

// Put the thing into the DOM!
export default TestDnD;
