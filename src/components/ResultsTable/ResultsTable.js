import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Paper,
  Tooltip,
} from "@material-ui/core";

const styles = theme => ({
  tableContainer: {
    width: "100%",
    margin: "auto",
    padding: 16,
    overflowX: "auto",
  },
  table: {
    backgroundColor: theme.palette.common.white,
  },
  head: {
    // backgroundColor: theme.palette.common.black,
    // color: theme.palette.common.white,
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
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

const ResultsTable = props => {
  const { classes } = props;
  return (
    <div className={classes.tableContainer}>
      <Table padding="dense" className={classes.table}>
        {/* <Paper> */}
        <TableHead className={classes.head}>
          <TableRow>
            <TableCell className={classes.centered}>Final</TableCell>
            <TableCell>Lead</TableCell>
            <TableCell>Follow</TableCell>
            {props.results[0].judgePlacements.map((judge, index) => {
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
            {props.results[0].calculatedPlacements.map((calculated, index) => {
              switch (index) {
                case 0:
                  return null;
                case 1:
                  return (
                    <TableCell
                      className={classes.dividerLeft + " " + classes.centered}
                      padding="none"
                    >
                      1s
                    </TableCell>
                  );
                default:
                  return (
                    <TableCell className={classes.centered}>
                      {index}s{/* ths */}
                    </TableCell>
                  );
              }
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.results.map(result => {
            return (
              <TableRow key={result.couple_id} hover className={classes.row}>
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
                          ? classes.centered + " " + classes.dividerLeft
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
                      placement="right"
                    >
                      <TableCell
                        className={
                          index < 2 &&
                          classes.dividerLeft + " " + classes.centered
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
        {/* </Paper> */}
      </Table>
    </div>
  );
};

ResultsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResultsTable);
