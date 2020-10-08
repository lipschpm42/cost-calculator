import React, { useState, useEffect } from 'react';
import { makeStyles, Input, InputAdornment, Grid } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  inputBox: {
    width: 65,
    fontSize: '15px',
    backgroundColor: 'white',
    borderRadius: 3,
    marginTop: theme.spacing(0)
  },
  gridItem: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  display: {
    width: 65,
    fontSize: '15px',
  },
}));

function MaterialRow(props) {
  const [cost, setCost] = useState(11.99)
  const [sheets, setSheets] = useState(1)
  const [total, setTotal] = useState()

  const classes = useStyles();


  useEffect(() => {
    setTotal((cost * sheets * 1.05).toFixed(2))
    props.materialCost(props.materialNum, total)
  }, [sheets, cost, total]);

  const costChange = (e) => {
    if (e.target.value.match("^[0-9]*[.]?[0-9]{0,2}$") !== null) {
      setCost(e.target.value)
    }
  }
  const sheetssChange = (e) => {
    if (e.target.value.match("^[0-9]*[.]?[0,5]{0,1}$") !== null) {
      setSheets(e.target.value)
    }
  }

  return (
    <Grid container>
      <Grid item className={classes.gridItem}>
        <Input
          className={classes.inputBox}
          value={cost}
          onChange={costChange}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </Grid>
      <Grid item className={classes.gridItem}>
        <Input className={classes.inputBox} type='text' value={sheets} onChange={sheetssChange} />
      </Grid>
      {/* <span className={classes.display}>${total}</span> */}
    </Grid>
  );
}

export default MaterialRow;
