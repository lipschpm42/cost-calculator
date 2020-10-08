import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core'


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
      'Cost / Sheet',
      'Total Sheets',
    ]

  const classes = useStyles();


  return (
    <Grid container component='span' >
      {headers.map((header) => <Grid item className={classes.gridSpacing}><Typography>{header}</Typography></Grid>)}
    </Grid>
  );
}

export default TitleRow;
