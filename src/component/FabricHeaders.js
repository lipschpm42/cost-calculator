import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  box: {
    paddingLeft: theme.spacing(3)
  },
  spacing: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    width: 75,
    display: 'inline'
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
    <Box component='span' className={classes.box} >
      {headers.map((header) => <Typography className={classes.spacing}>{header}</Typography>)}
    </Box>
  );
}

export default TitleRow;
