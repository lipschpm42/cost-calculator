import React from 'react';
import { makeStyles, Typography, Grid } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  gridSpacing: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    justify: 'center',
    width: 65,
  },
}
))
function TitleRow() {
  const headers =
    [
      'Cost / Yd',
      'Total Yds',
      'Fabric Width',
      'Cut on Fold',
      'Type of Squares',
      'Num of Squares',
    ]

  const classes = useStyles();


  return (
    <Grid container component='span' >
      {headers.map((header) => <Grid item className={classes.gridSpacing}><Typography>{header}</Typography></Grid>)}
    </Grid>
  );
}

export default TitleRow;
