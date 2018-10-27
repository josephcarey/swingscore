import React, { Component } from "react";
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

import ImageIcon from "@material-ui/icons/Image";

import NavbarSpacer from "../NavbarSpacer/NavbarSpacer";

class ResultsView extends Component {
  state = {
    results: [{ judgePlacements: [], calculatedPlacements: [] }],
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
    return (
      <div>
        <NavbarSpacer />
        <Typography variant="h5">Results</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Placement</TableCell>
              <TableCell>Couple ID</TableCell>
              {this.state.results[0].judgePlacements.map(judge => {
                return <TableCell>Judge {judge.judge_id}</TableCell>;
              })}
              {this.state.results[0].calculatedPlacements.map(
                (calculated, index) => {
                  switch (index) {
                    case 0:
                      return null;
                    case 1:
                      return <TableCell>1sts</TableCell>;
                    case 2:
                      return <TableCell>2nds</TableCell>;
                    case 3:
                      return <TableCell>3rds</TableCell>;
                    default:
                      return (
                        <TableCell>
                          {index}
                          ths
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
                <TableRow>
                  <TableCell>{result.finalPlacement}</TableCell>
                  <TableCell>{result.couple_id}</TableCell>
                  {/* These aren't sorted! We are relying on them coming from the server sorted. Fix that. */}
                  {result.judgePlacements.map(judgePlacement => {
                    return <TableCell>{judgePlacement.placement}</TableCell>;
                  })}
                  {result.calculatedPlacements.map((calculated, index) => {
                    return index > 0 ? (
                      <TableCell>
                        <Tooltip title="Add" placement="right">
                          {calculated.countThisLevelAndBetter} (
                          {calculated.sumThisLevelAndBetter})
                        </Tooltip>
                      </TableCell>
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

export default ResultsView;
