
import React, { useState, useEffect } from 'react';
import { makeStyles, Input, Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  inputBox: {
    width: 65,
    fontSize: '15px',
    backgroundColor: 'white',
    borderRadius: 3,
  },
  gridItem: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    justify: 'center',
    width: 65,
  }
}));

function LaborRow(props) {
  const [wages, setWages] = useState(17.5)
  const [hours, setHours] = useState(10)
  const [totalLabor, setTotalLabor] = useState()

  const classes = useStyles();

  useEffect(() => {
    setTotalLabor((wages * hours).toFixed(2))
    props.laborCost(parseFloat(totalLabor))
  });

  const wagesChange = (e) => {
    if (e.target.value.match("^[1-9]*[.]?[0-9]{0,2}$") !== null) {

      setWages(e.target.value)

    }
  }
  const hoursChange = (e) => {
    if (e.target.value.match("^[1-9]*[.]?[0-9]{0,2}$") !== null) {
      setHours(e.target.value)
    }
  }

  return (
    <div >
      <Grid container>
        <Grid item className={classes.gridItem}>
          <Typography>Wages</Typography>
        </Grid>
        <Grid item className={classes.gridItem}>
          <Typography>Hours</Typography>
        </Grid>
        {/* <Grid>
          <span style={{ margin: 10, width: '50px' }}>Total</span>
        </Grid> */}
      </Grid>
      <Grid container>
        <Grid item className={classes.gridItem}>
          <Input className={classes.inputBox} type='text' value={wages} onChange={wagesChange} />
        </Grid>
        <Grid item className={classes.gridItem}>
          <Input className={classes.inputBox} type='text' value={hours} onChange={hoursChange} />
        </Grid>
        {/* <Grid item className={classes.gridItem}>
          <span style={{ margin: 10, width: '50px' }}>${totalLabor}</span>
        </Grid> */}
      </Grid>
    </div>
  );
}

export default LaborRow;
