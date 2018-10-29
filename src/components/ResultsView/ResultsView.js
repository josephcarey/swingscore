import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";

import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Tooltip,
} from "@material-ui/core";

const styles = theme => ({
  centered: {
    textAlign: "center",
  },
  dividerLeft: {
    borderLeft: `1px solid
    ${theme.palette.divider}`,
  },
  name: {
    whiteSpace: "nowrap",
  },
});

class ResultsView extends Component {
  state = {
    results: [
      {
        lead: { username: "" },
        follow: { username: "" },
        judgePlacements: [],
        calculatedPlacements: [],
      },
    ],
  };
  componentDidMount() {
    this.handleGetResults();
  }

  handleGetResults = () => {
    let competitionToGet = 1;

    axios({
      method: "GET",
      url: `/api/score/results/${competitionToGet}`,
    })
      .then(response => {
        console.log(response.data);
        this.setState({ results: response.data });
      })
      .catch(error => {
        alert("Something went wrong getting the final results.");
        console.log(error);
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography variant="h5">Results</Typography>
        <Table padding="dense">
          <TableHead>
            <TableRow>
              <TableCell className={classes.centered}>Final</TableCell>
              <TableCell>Lead</TableCell>
              <TableCell>Follow</TableCell>
              {this.state.results[0].judgePlacements.map((judge, index) => {
                return (
                  <TableCell
                    className={
                      index < 1
                        ? (classes.centered, classes.dividerLeft)
                        : classes.centered
                    }
                  >
                    {judge.judge.username}
                  </TableCell>
                );
              })}
              {this.state.results[0].calculatedPlacements.map(
                (calculated, index) => {
                  switch (index) {
                    case 0:
                      return null;
                    case 1:
                      return (
                        <TableCell
                          className={[classes.dividerLeft, classes.centered]}
                          padding="none"
                        >
                          1s
                        </TableCell>
                      );
                    // case 2:
                    //   return (
                    //     <TableCell className={classes.centered}>2nds</TableCell>
                    //   );
                    // case 3:
                    //   return (
                    //     <TableCell className={classes.centered}>3rds</TableCell>
                    //   );
                    default:
                      return (
                        <TableCell className={classes.centered}>
                          {index}s{/* ths */}
                        </TableCell>
                      );
                  }

                  // return index > 0 ? <TableCell>{index}</TableCell> : null;
                }
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.results.map(result => {
              return (
                <TableRow hover>
                  <TableCell className={classes.centered}>
                    {result.finalPlacement}
                  </TableCell>
                  <TableCell className={classes.name}>
                    {result.lead.username}
                  </TableCell>
                  <TableCell className={classes.name}>
                    {result.follow.username}
                  </TableCell>
                  {/* These aren't sorted! We are relying on them coming from the server sorted. Fix that. */}
                  {result.judgePlacements.map((judgePlacement, j) => {
                    return (
                      <TableCell
                        className={
                          j < 1
                            ? [classes.centered, classes.dividerLeft]
                            : classes.centered
                        }
                      >
                        {judgePlacement.placement}
                      </TableCell>
                    );
                  })}
                  {result.calculatedPlacements.map((calculated, index) => {
                    return index > 0 ? (
                      <Tooltip
                        title={"Sum: " + calculated.sumThisLevelAndBetter}
                        // title={result.judgePlacements.map(judgePlacement => {
                        //   if (judgePlacement.placement <= index) {
                        //     return (
                        //       <div>
                        //         {judgePlacement.judge.username}:{" "}
                        //         {judgePlacement.placement}
                        //       </div>
                        //     );
                        //   } else {
                        //     return null;
                        //   }
                        // })}
                        placement="right"
                      >
                        <TableCell
                          className={
                            index < 2 && [classes.dividerLeft, classes.centered]
                          }
                        >
                          {calculated.countThisLevelAndBetter}
                          {/* ({calculated.sumThisLevelAndBetter}) */}
                        </TableCell>
                      </Tooltip>
                    ) : null;
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}

ResultsView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResultsView);
